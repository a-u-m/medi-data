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
  multipleStatements: true,
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
    "INSERT INTO patient_details VALUES( ? , ? , ? , ? , ? , ? ,?,?,?)";
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
      null,
      null,
      null
    ],
    (err, result) => {
      err ? console.log(err) : res.send(result);
      console.log(result);
    }
  );
});

app.delete("/appointment/:appointmentId", (req, res) => {
  const sqlQuery = "DELETE FROM doctor_appointment WHERE appointment_id=?;";
  db.query(sqlQuery, [req.params.appointmentId], (err, result) => {
    if (err) res.status(400).send({ message: "error" });
    else res.send(result);
  });
});



app.post(`/addAppointment`, (req, res) => {
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

app.post("/profileupdate", (req, res) => {
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

app.post("/appointment/upcoming", (req, res) => {
  const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  let query = "select * from doctor_appointment where appointSchedule = (select min(appointSchedule) from doctor_appointment where appointSchedule > ? and patient_id = ?);";
  db.query(
    query,
    [ currentDate ,req.body.patient_id],
    (err, result) => {
   
      if (err) res.status(400).send({ message: "err" });
      else res.send(result);
    }
  );
});

app.get("/:patientId/appointmentDetails", (req, res) => {
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

app.post("/api/exCredentials", (req, res) => {
  const username = req.body.username;
  const sqlQuery = "SELECT * FROM login_details WHERE username = ?;";
  db.query(sqlQuery, [username], (err, result) => {
    res.send(result);
  });
});

app.get("/", (req, res) => {
  res.send("Base");
});

//Vaccination API
app.get("/vaccination/:patientId/", (req, res) => {
  // const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const query1 = "SELECT * FROM vaccination WHERE patient_id = ?;";
  const query2 =
    "SELECT COUNT(*) as totalVaccination,SUM(vac_cost) as vacTotalCost FROM vaccination WHERE patient_id=?;";
  db.query(
    query1 + query2,
    [req.params.patientId, req.params.patientId],
    (err, result) => {
      if (err) res.status(400).send({ message: "err" });
      else res.send(result);
    }
  );
});

app.delete("/vaccination/:vaccinationId", (req, res) => {
  const sqlQuery = "DELETE FROM vaccination WHERE Vaccination_id=?;";
  db.query(sqlQuery, [req.params.vaccinationId], (err, result) => {
    if (err) res.status(400).send({ message: "error" });
    else res.send(result);
  });
});

app.post(`/vaccination/add`, (req, res) => {
  const data = req.body;
  const sqlQuery = "INSERT INTO vaccination VALUES(?,?,?,?,?,?,?,?,?,?)";
  db.query(
    sqlQuery,
    [
      data.vaccination_id,
      data.patient_id,
      data.vaccination_name,
      data.vac_update_date,
      parseInt(data.vac_cost),
      parseInt(data.dose_no),
      parseInt(data.net_doses),
      data.type,
      data.vac_for,
      data.vaccination_date,
    ],
    (err, result) => {
      if (err) res.status(400).send({ message: "err" });
      else res.send(result);
    }
  );
});

//Physical API

app.get("/physical/:patientId/", (req, res) => {
  // const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const query1 = "SELECT * FROM measurements WHERE patient_id = ?;";
  db.query(query1, [req.params.patientId], (err, result) => {
    if (err) res.status(400).send({ message: "err" });
    else res.send(result);
  });
});

app.post(`/physical/add`, (req, res) => {
  const data = req.body;
  const sqlQuery = "INSERT INTO measurements VALUES(?,?,?,?,?,sysdate())";
  db.query(
    sqlQuery,
    [
      data.height,
      data.weight,
      data.disability,
      data.blood_grp,
      data.patient_id,
    ],
    (err, result) => {
      console.log(err);
      if (err) res.status(400).send({ message: "err" });
      else res.send(result);
    }
  );
});


app.post("/physical/update", (req, res) => {
  const data = req.body;
  const sqlQuery =
    "UPDATE measurements SET Height=?,Weight=?,disability=?,blood_group=? WHERE patient_id=?";
  db.query(
    sqlQuery,
    [
      data.height,
      data.weight,
      data.disability,
      data.blood_grp,
      data.patient_id
    ],
    (err, result) => {
      console.log(err)
      err ? res.status(400).send("error") : res.send(result);
    }
  );
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
  const addQuery = "insert into drugs_prescription values(?,?,?,?,?,?,?,sysdate());";
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
app.post("/prescription/delete", (req, res) => {
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
//Medical test api
app.get("/test/:id", (req, res) => {
  const id = req.params.id;
  const TQuery = "select * from test where patient_id=?;";
  db.query(TQuery, [id], (err, result) => {
    if (result.length == 0) {
      res.send([0]);
    } else {
      res.send(result);
    }
  });
});
app.post("/test/delete", (req, res) => {
  const delquery = "delete from test where Test_id=?;";
  db.query(delquery, [req.body.Test_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("success server");
      res.send("nice");
    }
  });
});
app.post("/test/add/:id", (req, res) => {
  const addQuery = "insert into test values(?,?,?,?,?,?,?,?);";
  db.query(
    addQuery,
    [
      req.body.Test_id,
      req.body.Treatment_provider,
      req.body.Test_title,
      req.body.Doctor_name,
      req.body.Result,
      req.body.cost,
      req.params.id,
      req.body.date,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        res.send(true);
      }
    }
  );
});
app.get("/test/overview/:id", (req, res) => {
  const id = req.params.id;
  const q1 = "Select count(*) as total from test where patient_id=?;";
  const q2 =
    "Select count(*) as positive from test where patient_id=? and Result='positive';";
  const q3 =
    "Select count(*) as negative from test where patient_id=? and Result='negative';";
  db.query(q1 + q2 + q3, [id, id, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/test/recent/:id",(req,res)=>{

  const id=req.params.id;
  const recentQuery="select * from test where patient_id=? order by date desc";
  db.query(recentQuery,[id],(err,result)=>{
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  })
})
app.get("/test/positive/:id",(req,res)=>{

  const id=req.params.id;
  const recentQuery="select * from test where patient_id=? and Result='positive'";
  db.query(recentQuery,[id],(err,result)=>{
    if(err){
      console.log(err);
    }else{
      if(result.length==0){
        res.send([0]);
      }else{
        res.send(result);
      }
      
    }
  })
})
app.get("/test/negative/:id",(req,res)=>{

  const id=req.params.id;
  const recentQuery="select * from test where patient_id=? and Result='negative'";
  db.query(recentQuery,[id],(err,result)=>{
    if(err){
      console.log(err);
    }else{
      if(result.length==0){
        res.send([0]);
      }else{
        res.send(result);
      }
      
    }
  })
})

//Past Diseases
app.get("/disease/:id", (req, res) => {
  const id = req.params.id;
  const PQuery = "select * from past_diseases where patient_id=?;";
  db.query(PQuery, [id], (err, result) => {
    if (result.length == 0) {
      res.send([0]);
    } else {
      res.send(result);
    }
  });
});
app.post("/disease/delete", (req, res) => {
  const delquery = "delete from past_diseases where disease_id=?;";
  db.query(delquery, [req.body.disease_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
   
      res.send("nice");
    }
  });
});
app.post("/disease/add/:id",(req,res)=>{
  const id=req.params.id;
  const pdata=req.body;
  const pAdd="insert into past_diseases values(?,?,?,?,?,?);";
  db.query(pAdd,[pdata.disease_id,pdata.disease_name,pdata.disease_type,pdata.doctor_consulted,id,pdata.date],(err,result)=>{
    if(err){
      console.log(err);
    }else{
      res.send("success");
    }
  })

})
app.get("/dates",(req,res)=>{
  const query=" select doctor_appointment.appointRegDate,drugs_prescription.date,measurements.date,past_diseases.date,test.date,vaccination.vacUpdateDate from doctor_appointment inner join drugs_prescription on doctor_appointment.patient_id=drugs_prescription.patient_id inner join measurements on drugs_prescription.patient_id = measurements.patient_id inner join past_diseases on measurements.patient_id = past_diseases.patient_id inner join test on past_diseases.patient_id=test.patient_id inner join vaccination on test.patient_id=vaccination.patient_id ;";
  db.query(query,(err,result)=>{
    if(err){
      console.log(err);
    }
    else{
      if(result.length==0){
        res.send([0])
      }else{
          res.send(result);
      }

    
    }
  })
})

app.listen(3300, () => {
  console.log("Express Server 3300");
});
