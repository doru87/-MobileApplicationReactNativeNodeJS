var createError = require("http-errors");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");

var incarcaRouter = require("./routes/incarcaDate");
var incarcaMagazine = require("./routes/listaMagazine");
var incarcaCategorie = require("./routes/adaugaCategorie");
var incarcaListaCategorii = require("./routes/listaCategorii");
var incarcaMeniu = require("./routes/adaugaMeniu");
var charge = require("./routes/charge");
var createCustomer = require("./routes/createCustomer");
var incarcaListaMeniuri = require("./routes/listaMeniuri");
var cautaMeniu = require("./routes/cautaMeniu");
var listaIntreagaMeniuri = require("./routes/listaIntreagaMeniuri");

var db = require("../NodeJS/lib/db");

var app = express();

const port = process.env.PORT || 5000;

var cors = require("cors");
app.use(cors());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/", incarcaRouter);
app.use("/", incarcaMagazine);
app.use("/", incarcaCategorie);
app.use("/", incarcaListaCategorii);
app.use("/", incarcaMeniu);
app.use("/", charge);
app.use("/", createCustomer);
app.use("/", incarcaListaMeniuri);
app.use("/", cautaMeniu);
app.use("/", listaIntreagaMeniuri);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});
const hostname = "169.254.43.135";
app.listen(port, hostname, () => console.log(`Listening on port ${port}`));

module.exports = app;
