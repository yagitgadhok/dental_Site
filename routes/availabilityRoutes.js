const express = require("express");
const router = express.Router();
const {
  getAvailability,
  postAvailability,
} = require("../controller/availabilityController");

router.get("/", getAvailability);

router.post("/:id", postAvailability);

module.exports = router;
