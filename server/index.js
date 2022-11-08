const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
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

app.get("/", (req, res) => {
  const sqlDisplay = "SELECT * FROM login_details;";
  db.query(sqlDisplay, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.listen(3300, () => {
  console.log("Express Server 3300");
});
