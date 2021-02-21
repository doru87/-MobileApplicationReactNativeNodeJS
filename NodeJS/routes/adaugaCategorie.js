var express = require("express");
const app = express();
var bodyParser = require("body-parser");
var db = require("../lib/db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/adaugaCategorie", (req, res) => {
  const data = {
    nume: req.body.nume,
    idMagazin: req.body.idMagazin,
    sigla: req.body.sigla,
  };

  db.query(
    "INSERT INTO categorii (id_magazin,nume_categorie,poza_categorie) VALUES ('" +
      data.idMagazin +
      "','" +
      data.nume +
      "','" +
      data.sigla +
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
