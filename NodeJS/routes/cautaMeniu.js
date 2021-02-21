var express = require("express");
const app = express();
var bodyParser = require("body-parser");
var db = require("../lib/db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/cautaMeniu", (req, res) => {
  const nume = req.query.nume;

  db.query(
    "select * from meniuri where nume_meniu LIKE '%" + nume + "%'",
    function (err, row, fields) {
      if (err) throw err;
      res.json({
        data: row,
      });
    }
  );
});

module.exports = app;
