const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

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
    db.query(sqlInsert, [usernameIn, passwordIn], (error, result) => {
        if (error)
          console.log(error);
        // console.log(result);
    })
})

app.get('/api/getByAirport', (require, response) => {
    const origIn = require.body.origAirport;
    const destIn = require.body.destAirport;
    console.log(origIn);

    const sqlSelect = "SELECT * FROM `Operate_Flight` WHERE `orig_airport_code` = ?";
    db.query(sqlSelect, [origIn], (error, result) => {
      response.send(result);
      console.log(result);
      if (error) 
        console.log(error);
    })
})

app.listen(3002, () => {
    console.log("running on port 3002");
})