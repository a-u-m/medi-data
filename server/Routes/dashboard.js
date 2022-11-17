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
console.log(db)
router.post("/profileupdate", (req, res) => {
  const data = req.body;
  console.log(req.body);
  const sqlQuery =
    "UPDATE patient_details SET firstname=?,lastname=?,age=?,contact_no=?,email=?,blood_grp=?,gender=?,disablity=? WHERE patient_id=?";
  db.query(
    sqlQuery,
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

router.get("/:patientId/myprofile", (req, res) => {
  db.query(
    "SELECT * FROM profile_view WHERE patient_id = ?;",
    [req.params.patientId],
    (err, result) => {
      if (err) res.status(400).send({ message: "err" });
      else res.send(result);
    }
  );
});
module.exports=router
