const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const availabilitySchema = new mongoose.Schema({
  patientId: {
    type: Number,
    required: true,
    unique: true,
  },
  startTime: {
    type: Date,
    required: true,
    // min: "10:00:00",
    // validate: {
    //   validator: function (value) {
    //     const currentTime = new Date();
    //     const minimumTime = new Date();
    //     minimumTime.setHours(10, 0, 0); // Set the minimum time to 10:00 AM

    //     return value >= minimumTime && value <= currentTime;
    //   },
    //   message:
    //     "Invalid start time. Start time cannot be set before 10:00 AM or in the future.",
    // },
  },
  endTime: {
    type: Date,
    required: true,

    // validate: {
    //   validator: function (value) {
    //     const currentTime = new Date();
    //     const minimumTime = new Date();
    //     minimumTime.setHours(10, 0, 0); // Set the minimum time to 10:00 AM
    //     const maximumTime = new Date();
    //     maximumTime.setHours(20, 0, 0); // Set the maximum time to 8:00 PM

    //     return (
    //       value >= minimumTime && value <= currentTime && value <= maximumTime
    //     );
    //   },
    //   message:
    //     "Invalid end time. End time cannot be set before 10:00 AM, in the future, or after 8:00 PM.",
    // },
  },
});

const Availability = mongoose.model("Availability", availabilitySchema);
module.exports = Availability;
