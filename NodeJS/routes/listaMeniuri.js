var express = require("express");
const app = express();
var bodyParser = require("body-parser");
var db = require("../lib/db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/listameniuri", (req, res) => {
  const idMagazin = req.query.idMagazin;
  const idCategorie = req.query.idCategorie;

  db.query(
    "select * from meniuri where id_magazin = '" +
      idMagazin +
      "' and id_categorie= '" +
      idCategorie +
      "'",
    function (err, row, fields) {
      if (err) throw err;
      res.json({
        data: row,
      });
    }
  );
});
module.exports = app;
