const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const exphbs = require("express-handlebars");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.engine("hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.listen(PORT, () => {
  console.log(`🌎 Now Listening to ${PORT}`);
});
