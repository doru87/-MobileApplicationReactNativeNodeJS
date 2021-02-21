var express = require("express");
const app = express();
var bodyParser = require("body-parser");
var db = require("../lib/db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/adaugaMeniu", (req, res) => {
  const data = {
    idMagazin: req.body.idMagazin,
    idCategorie: req.body.idCategorie,
    nume: req.body.nume,
    descriere: req.body.descriere,
    pret: req.body.pret,
    imagine: req.body.imagine,
  };

  db.query(
    "INSERT INTO meniuri (id_magazin,id_categorie,nume_meniu,descriere_meniu,pret_meniu,poza_meniu) VALUES ('" +
      data.idMagazin +
      "','" +
      data.idCategorie +
      "','" +
      data.nume +
      "','" +
      data.descriere +
      "','" +
      data.pret +
      "','" +
      data.imagine +
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
