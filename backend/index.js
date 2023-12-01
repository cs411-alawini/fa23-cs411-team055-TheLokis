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

app.post('/api/createRecord', (require, response) => {
    const usernameIn = require.body.username;
    const passwordIn = require.body.password;
    const airlineCodeIn = require.body.airlineCode;
    const flightNumIn = require.body.flightNum;
    const airlineNameIn = require.body.airlineName;
    const minutesIn = require.body.minutes;
    const dayIn = require.body.day;
    const distanceIn = require.body.distance;
    const origIn = require.body.orig;
    const destIn = require.body.dest;

    const sqlInsertOF = 
    `INSERT IGNORE INTO Operate_Flight (flight_number, airline_code, orig_airport_code, dest_airport_code) VALUES (?, ?, ?, ?);`
    db.query(sqlInsertOF, [flightNumIn, airlineCodeIn, flightNumIn, airlineCodeIn, origIn, destIn], (error, result) => {
      if (error) {
        console.log(error);
      }
    });

    const sqlInsertDelay = "INSERT INTO Delay (user_id, flight_number, airline_code, minutes, day_of_week, distance) VALUES ((SELECT User.user_id FROM User WHERE User.username = ?), ?, ?, ?, ?, ?)"
    db.query(sqlInsertDelay, [usernameIn, flightNumIn, airlineCodeIn, minutesIn, dayIn, distanceIn], (error, result) => {
        console.log(result);
        if (error) {
          console.log(error);
        }
    })
})

// app.get('/api/getByAirportAll', (response) => {
//   const sqlSelect = 
//   `SELECT o.orig_airport_code, o.dest_airport_code, o.airline_code, o.flight_number, a.airline_name, (SUM(CASE WHEN d.minutes > 0 THEN 1 ELSE 0 END) / COUNT(d.delay_number)) * 100 AS delay_rate 
//   FROM Operate_Flight o NATURAL JOIN Airline a NATURAL JOIN Delay d 
//   GROUP BY o.flight_number, o.airline_code`;
//   db.query(sqlSelect, (error, result) => {
//     response.send(result);
//     if (error) 
//       console.log(error);
//   })
// })

app.get('/api/getByAirport', (require, response) => {
    const origIn = require.query.origAirport;
    const destIn = require.query.destAirport;

    const sqlSelect = 
      `SELECT o.orig_airport_code, o.dest_airport_code, o.airline_code, o.flight_number, a.airline_name, (SUM(CASE WHEN d.minutes > 0 THEN 1 ELSE 0 END) / COUNT(d.delay_number)) * 100 AS delay_rate 
      FROM Operate_Flight o NATURAL JOIN Airline a NATURAL JOIN Delay d 
      WHERE o.orig_airport_code = ? AND o.dest_airport_code = ? GROUP BY o.flight_number, o.airline_code`;
    db.query(sqlSelect, [origIn, destIn], (error, result) => {
      response.send(result);
      // console.log(result);
      if (error) 
        console.log(error);
    })
})

// app.get('/api/getByAirline', (require, response) => {
//   const airlineIn = require.query.airline;

//   const sqlSelect = 
//     `SELECT a.airline_code, a.airline_name, COUNT(d.delay_number) AS num_of_flights, (SUM(CASE WHEN d.minutes > 0 THEN 1 ELSE 0 END) / COUNT(d.delay_number)) * 100 AS delay_rate 
//     FROM Airline a NATURAL JOIN Delay d 
//     WHERE a.airline_code = ?
//     GROUP BY a.airline_code`;
//   db.query(sqlSelect, [airlineIn], (error, result) => {
//     response.send(result);
//     console.log(result);
//     if (error) 
//       console.log(error);
//   })
// })

app.get('/api/getAccountRecord', (require, response) => {
  const usernameIn = require.query.username;
  const passwordIn = require.query.password;

  const sqlSelect = 
    `SELECT *
    FROM Airline a NATURAL JOIN Delay d NATURAL JOIN User u JOIN Operate_Flight o
    WHERE u.username = ? AND u.password = ?`;
  db.query(sqlSelect, [usernameIn, passwordIn], (error, result) => {
    response.send(result);
    console.log(result);
    if (error) 
      console.log(error);
  })
})

app.get('/api/getPassword', (require, response) => {
    const usernameIn = require.query.username;
    const passwordIn = require.query.password;

    const sqlSelect = 'SELECT * FROM `User` WHERE `username` = ? AND `password` = ?';
    db.query(sqlSelect, [usernameIn, passwordIn], (error, result) => {
      response.send(result);
      if (error) 
      console.log(error);
    });
})

app.post('/api/updatePassword', (require, response) => {
  const usernameIn = require.body.username;
  const currentPasswordIn = require.body.currentPassword;
  const newPasswordIn = require.body.newPassword;

  const sqlUpdatePassword = 'UPDATE `User` SET `password` = ? WHERE `username` = ? AND `password` = ?';
  db.query(sqlUpdatePassword, [newPasswordIn, usernameIn, currentPasswordIn], (error, result) => {
      if (error) {
          console.log(error);
          response.status(500).json({ success: false, message: 'Failed to update password.' });
      } else {
          if (result.affectedRows > 0) {
              response.json({ success: true, message: 'Password updated successfully.' });
          } else {
              response.status(401).json({ success: false, message: 'Invalid username or current password.' });
          }
      }
  });
});

app.delete('/api/deleteAccount', (req, res) => {
  const usernameIn = req.body.username;
  const passwordIn = req.body.password;

  const sqlSelect = 'SELECT * FROM `User` WHERE `username` = ? AND `password` = ?';
  db.query(sqlSelect, [usernameIn, passwordIn], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Failed to delete account.' });
    } else {
      if (result.length > 0) {

        const sqlDeleteAccount = 'DELETE FROM `User` WHERE `username` = ? AND `password` = ?';
        db.query(sqlDeleteAccount, [usernameIn, passwordIn], (deleteError, deleteResult) => {
          if (deleteError) {
            console.log(deleteError);
            res.status(500).json({ success: false, message: 'Failed to delete account.' });
          } else {
            if (deleteResult.affectedRows > 0) {
              res.json({ success: true, message: 'Account delete success.' });
            } else {
              res.status(401).json({ success: false, message: 'Invalid username or password.' });
            }
          }
        });
      } else {
        res.status(401).json({ success: false, message: 'Invalid username or password.' });
      }
    }
  });
})

app.get('/api/getByAirline', (require, response) => {
  const inputAirline = require.query.airline; 
  console.log(inputAirline);

  const sqlCallStoredProcedure = "CALL GetFlightsDelayRatesAndStates(?)";

  db.query(sqlCallStoredProcedure, [inputAirline], (error, result) => {
      if (error) {
          console.error(error);
          response.send([]);
      } else {
          response.send(result[0]);
      }
  });
});

app.listen(3002, () => {
    console.log("running on port 3002");
})