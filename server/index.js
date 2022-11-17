const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { application, response } = require("express");
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const auth=require('./Routes/auth');
const appointment=require('./Routes/appointment');
const dashboard=require('./Routes/dashboard');
const prescription=require('./Routes/prescription');
app.use("/auth",auth);
app.use("/appointment",appointment);
app.use("/dashboard",dashboard);
app.use("/prescription",prescription);
app.get("/", (req, res) => {
  res.send("Base");
});
app.listen(3300, () => {
  console.log("Express Server 3300");
});
// const mysql = require("mysql");
// const dotenv = require("dotenv");
// dotenv.config();
// const db = mysql.createPool({
//   host: process.env.DBHOST,
//   user: process.env.DBUSER,
//   password: process.env.DBPASSWORD,
//   database: process.env.DATABASE,
//   multipleStatements: true,
// });
// module.exports=db




