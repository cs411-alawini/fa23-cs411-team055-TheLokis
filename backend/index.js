const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');

var db = mysql.createConnection({
    host: '146.148.48.57',
    user: 'root',
    password: '12345',
    database: 'flightdatabase',
})

db.connect(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected!");
  }
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/createAcc', (require, response) => {
    const usernameIn = require.body.username;
    const passwordIn = require.body.password;

    const sqlInsert = "INSERT INTO `User` (`username`, `password`) values (?, ?)"; 
    db.query(sqlInsert, [1500, usernameIn, passwordIn], (error, result) => {
        console.log(error);
    })
    
})

app.listen(3002, () => {
    console.log("running on port 3002");
})