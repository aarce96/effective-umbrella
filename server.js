const express = require("express");
const bodyParser = require("body-parser");
// const mysql = require("mysql");
const exphbs = require("express-handlebars");

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
  res.render("homepage");
});

app.listen(PORT, () => {
  console.log(`🌎 Now Listening to ${PORT}`);
});
