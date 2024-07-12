const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db.js");
require("dotenv").config();

var app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const userRoutes = require("./routes/userRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");
// const profileRoutes = require("./routes/profileRoutes");

app.use("/user", userRoutes);
app.use("/availability", availabilityRoutes);
// app.use("/profile", profileRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
