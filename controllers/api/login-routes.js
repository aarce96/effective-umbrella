const router = require("express").Router();
const Login = require("../../models/Login");

router.post("/signup", (req, res) => {
  Login.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  Login.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbLoginData) => {
    if (!dbLoginData) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }

    const validPassword = dbLoginData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbLoginData.id;
      req.session.username = dbLoginData.username;
      req.session.loggedIn = true;

      res.json({ user: dbLoginData, message: "You are now logged in!" });
    });
  });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
