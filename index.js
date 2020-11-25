const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config(); 
const SERVER_IP = process.env.SERVER_IP;
const PORT = process.env.NODE_PORT || 8090;

try {
  mongoose.connect("mongodb://localhost/dve", {
    useNewUrlParser: true,
  });
  let db = mongoose.connection;

  //Check connection
  db.once("open", () => {
    console.log("Connected to MongoDb!");
  });

  db.on("error", (err) => {
    console.log("err", err);
  });
} catch (e) {
  console.log("failed connecting to mongoDB", e);
}

const app = express();
console.log("SERVER_IP", SERVER_IP);

var cors = require("cors");
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cors({ credentials: true, origin: SERVER_IP }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("Hello World");
  res.send("Hello World");
});
app.get("/back", (req, res) => {
  console.log("Hello World back");

  res.send("Hello World BACK");
});

const contact = require("./routes/contact.routes");
app.use("/contact", contact);

app.use((req, res, next) => {
  // Error goes via `next()` method
  setImmediate(() => {
    next(new Error("Something went wrong"));
  });
});

app.use(function (err, req, res, next) {
  console.error("app use error", err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

//// FILE UPLOAD END ////

const port = process.env.PORT || PORT;
const server = app.listen(port, () => {
  console.log("Connected to port " + port); 
});
