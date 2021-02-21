let mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "reactnativedb",
  multipleStatements: true,
});
db.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
  db.query("CREATE DATABASE reactnativedb", (err, rows, fields) => {
    if (err) throw err;
    console.log("Database created");
  });
});

module.exports = db;
