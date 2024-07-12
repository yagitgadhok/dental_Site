const mongoose = require("mongoose");
require("dotenv").config();

const mongoUrl = process.env.MONGODB_URL;

mongoose.connect(mongoUrl);

const db = mongoose.connection;

db.on("connection", () => {
  console.log("DB connection established");
});

db.on("error", (err) => console.error("DB connection error: ", err));

db.on("disconnected", () => {
  console.log("DB connection disconnected");
});

module.exports = db;
