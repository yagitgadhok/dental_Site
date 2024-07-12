const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  patientId: {
    type: Number,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["patient", "admin", "staff"],
    required: true,
  },
});
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  try {
    //hash pwd generation
    const salt = await bcrypt.genSalt(10);

    //hash pwd
    const hashedPwd = await bcrypt.hash(user.password, salt);

    //ovverride nrml pwd to hashed password
    user.password = hashedPwd;
    next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
