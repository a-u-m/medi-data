const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
const connect =()=>{return(mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true,
}));}
module.exports=connect