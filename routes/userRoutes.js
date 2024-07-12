const express = require("express");
const router = express.Router();

const {
  getSignup,
  getLogin,
  requestResetPassword,
  resetPassword,
  getProfile,
  updateProfile,
  getUsers,
} = require("../controller/userController");
const { jwtAuthMiddleware } = require("../jwt");

router.get("/", getUsers);

router.post("/signup", getSignup);

router.post("/login", getLogin);

router.post("/request-reset", requestResetPassword);

router.post("/reset/:token", resetPassword);

router.get("/profile", jwtAuthMiddleware, getProfile);

router.put("/profile/:id", jwtAuthMiddleware, updateProfile);

module.exports = router;
