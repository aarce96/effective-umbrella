const router = require("express").Router();
const User = require("../../models/User");

// Debugger;
// console.log(User);

// Get all users
router.get("/users", (req, res) => {
  User.findAll()
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get a single user info
router.get("/users/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
  })

    .then((dbUserData) => {
      console.log(dbUserData);
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a new user
router.post("/users/create", (req, res) => {
  User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  })
    .then((dbUserData) => {
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
