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
router.get("/:id", (req, res) => {
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
router.post("/add/:id", (req, res) => {
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
router.post("/delete", (req, res) => {
  const delquery = "delete from drugs_prescription where prescription_id=?;";
  db.query(delquery, [req.body.pre_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("success server");
      res.send("nice");
    }
  });
});
module.exports=router