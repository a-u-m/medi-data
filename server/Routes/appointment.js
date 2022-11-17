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


router.delete("/:appointmentId", (req, res) => {
  const sqlQuery = "DELETE FROM doctor_appointment WHERE appointment_id=?;";
  db.query(sqlQuery, [req.params.appointmentId], (err, result) => {
    if (err) res.status(400).send({ message: "error" });
    else res.send(result);
  });
});

router.post(`/addAppointment`, (req, res) => {
  const data = req.body;
  const sqlQuery = "INSERT INTO doctor_appointment VALUES(?,?,?,?,?,?,?,?,?)";
  db.query(
    sqlQuery,
    [
      data.appointment_id,
      data.patient_id,
      data.type,
      data.status,
      data.doctor,
      data.note,
      parseInt(data.cost),
      data.regDate,
      data.schedule,
    ],
    (err, result) => {
      if (err) res.status(400).send({ message: "err" });
      else res.send(result);
    }
  );
});
router.get("/:patientId/appointmentDetails", (req, res) => {
  const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const query1 = "SELECT * FROM doctor_appointment WHERE patient_id = ?;";
  const query2 =
    "SELECT COUNT(*) as totalAppoint,SUM(cost) as sumCost FROM doctor_appointment WHERE patient_id=?;";
  const query3 =
    "SELECT COUNT(*) as pendingAppoint FROM doctor_appointment WHERE patient_id=? AND appointSchedule >= ?;";
  db.query(
    query1 + query2 + query3,
    [
      req.params.patientId,
      req.params.patientId,
      req.params.patientId,
      currentDate,
    ],
    (err, result) => {
      if (err) res.status(400).send({ message: "err" });
      else res.send(result);
    }
  );
});
 module.exports=router;