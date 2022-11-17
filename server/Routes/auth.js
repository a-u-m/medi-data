const express=require('express');
const router=express.Router();
// const db=require('../index');
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
const db = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true,
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sqlLoginQuery =
    "SELECT * FROM login_details WHERE username = ? AND password = ?;";
  db.query(sqlLoginQuery, [username, password], (err, result) => {
    if (err) res.status(400).send({ message: "err" });
    else res.send(result);
  });
});

router.post("/register", (req, res) => {
  const errors = { err1: false, err2: false };
  const login = req.body.loginDetails;
  const personal = req.body.personalDetails;
  const loginRegisterQuery =
    "INSERT INTO login_details VALUES( ? , ? , ? , ? );";
  const personalRegisterQuery =
    "INSERT INTO patient_details VALUES( ? , ? , ? , ? , ? , ? )";
  db.query(
    loginRegisterQuery,
    [login.patient_id, login.username, login.password, login.registrationDate],
    (err, result) => {
      err ? res.send(err) : null;
    }
  );
  db.query(
    personalRegisterQuery,
    [
      login.patient_id,
      personal.firstName,
      personal.lastName,
      parseInt(personal.age),
      personal.contact,
      personal.email,
    ],
    (err, result) => {
      err ? console.log(err) : res.send(result);
      console.log(result);
    }
  );
});
router.post("/api/exCredentials", (req, res) => {
  const username = req.body.username;
  const sqlQuery = "SELECT * FROM login_details WHERE username = ?;";
  db.query(sqlQuery, [username], (err, result) => {
    res.send(result);
  });
});

module.exports=router