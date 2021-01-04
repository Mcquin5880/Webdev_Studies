require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const faker = require('faker');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASS,
  database: 'join_us'
});

app.get("/", function(req, res) {

  var query = "SELECT COUNT(*) AS count FROM users";

  connection.query(query, function(err, results) {
    if (err) throw err;
    var count = results[0].count;
    res.render("home", {count: count});
  });
});

app.get("/joke", function(req, res) {
  var joke = "What do you call a dog that does magic trickes? A labracadabrador.";
  res.send(joke);
});

app.post("/register", function(req, res) {
  var person = {
    email: req.body.email
  };
  connection.query("INSERT INTO users SET ?", person, function(err, result) {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});

app.listen(3000, function() {
  console.log("App is listening on port 3000.");
});


//connection.end();
