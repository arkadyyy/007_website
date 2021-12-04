const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: "007_website",
  port: process.env.RDS_PORT,
  multipleStatements: true,
});

module.exports = db;
