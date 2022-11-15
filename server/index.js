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
    if (err) res.status(400).send({ message: "err" });
    else res.send(result);
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

app.post("/profileupdate", (req, res) => {
  const data = req.body;
  console.log(req.body);
  const personalRegisterQuery =
    "UPDATE patient_details SET firstname=?,lastname=?,age=?,contact_no=?,email=?,blood_grp=?,gender=?,disablity=? WHERE patient_id=?";
  db.query(
    personalRegisterQuery,
    [
      data.firstname,
      data.lastname,
      parseInt(data.age),
      data.contact,
      data.email,
      data.blood_grp,
      data.gender,
      data.disability,
      data.patient_id,
    ],
    (err, result) => {
      console.log(result);
      err ? res.status(400).send("error") : res.send(result);
    }
  );
});

app.get("/:patientId/myprofile", (req, res) => {
  db.query(
    "SELECT * FROM profile_view WHERE patient_id = ?;",
    [req.params.patientId],
    (err, result) => {
      if (err) res.status(400).send({ message: "err" });
      else res.send(result);
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
//Prescription API
app.get("/prescription/:id", (req, res) => {
  const id = req.params.id;
  const preQuery = "select * from drugs_prescription where patient_id=?;";
  db.query(preQuery, [id], (err, result) => {
    if (result.length == 0) {
      res.send([0]);
    } else {
      res.send(result);
    }
  });
});
app.post("/prescription/add/:id", (req, res) => {
  const addQuery = "insert into drugs_prescription values(?,?,?,?,?,?,?);";
  db.query(
    addQuery,
    [
      req.body.prescription_id,
      req.body.course_title,
      req.body.medication,
      req.body.course_duration,
      req.body.intervals,
      req.body.comment,
      req.params.id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        console.log("success");
        res.send(true);
      }
    }
  );
});

app.listen(3300, () => {
  console.log("Express Server 3300");
});
