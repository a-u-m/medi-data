const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const { application, response } = require("express");
const app = express();
dotenv.config();

const db = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE,
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sqlLoginQuery =
    "SELECT * FROM login_details WHERE username = ? AND password = ?;";
  db.query(sqlLoginQuery, [username, password], (err, result) => {
    res.send(result);
  });
});

app.post("/register", (req, res) => {
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
      err ? res.send(err) : console.log("s1");
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
      err ? console.log(err) : res.send("Successful");
    }
  );
});

app.get("/:patientId/perdet", (req, res) => {
  db.query(
    "SELECT * FROM patient_details WHERE patient_id = ?;",
    [req.params.patientId],
    (err, result) => {
      res.send(result);
    }
  );
});

app.post("/api/exCredentials", (req, res) => {
  const username = req.body.username;
  const sqlLoginQuery = "SELECT * FROM login_details WHERE username = ?;";
  db.query(sqlLoginQuery, [username], (err, result) => {
    res.send(result);
  });
});

app.get("/", (req, res) => {
  res.send("Base");
});

app.listen(3300, () => {
  console.log("Express Server 3300");
});
