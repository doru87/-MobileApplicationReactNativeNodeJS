var express = require("express");
const app = express();
var bodyParser = require("body-parser");

var db = require("../lib/db");
const moment = require("moment");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/incarcadate", (req, res) => {
  var datetime = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  const data = {
    nume: req.body.nume,
    categorii: req.body.categorii,
    sigla: req.body.sigla,
    locatieGPS: req.body.locatieGPS,
  };
  console.log(data);

  db.query(
    "INSERT INTO magazine (nume,sigla,categorii,locatie_gps,rating,data) VALUES ('" +
      data.nume +
      "','" +
      data.sigla +
      "','" +
      data.categorii +
      "','" +
      data.locatieGPS +
      "','" +
      0 +
      "','" +
      datetime +
      "')",
    function (err, rows, fields) {
      if (err) throw err;
      console.log(err);
    }
  );
  return res.json({
    data: req.body.nume,
  });
});

module.exports = app;
