const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const Sequelize = require("./config/connection");
const User = require("./models/User");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.get("", (req, res) => {
  User.findAll()
    .then((dbUserData) => {
      console.log(dbUserData);
      const Users = dbUserData.map((v) => v.dataValues);
      res.render("homepage", { Users });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

app.use(require("./controllers/"));

Sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`🌎 Now Listening to ${PORT}`);
  });
});
