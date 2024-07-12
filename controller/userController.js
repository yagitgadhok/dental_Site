const User = require("../model/user");
const { jwtAuthMiddleware, generateToken } = require("../jwt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.getSignup = async (req, res) => {
  try {
    const data = req.body;

    const newUser = new User(data);

    const response = await newUser.save();

    const payload = {
      id: response.id,
    };

    const token = generateToken(payload);

    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getLogin = async (req, res) => {
  try {
    const { patientId, password } = req.body;

    const user = await User.findOne({ patientId: patientId });

    // if (!user || !(await user.comparePassword(password))) {
    //   return res.status(401).json({ error: "Invalid username or password" });
    // }
    const payload = {
      id: user.id,
    };

    const token = generateToken(payload);
    res.status(200).json({ token: token });
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
  }
};

exports.requestResetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");

    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "ygadhok@gmail.com",
        pass: "ygadhok@92",
      },
    });

    const mailOptions = {
      to: user.email,
      from: "passwordreset@demo.com",
      subject: "Password Reset",
      text: `Please click on the following link, or paste it into your browser to complete the process:\n\n
            http://localhost:3000/reset/${token}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);
    res.send("Password reset email sent");
  } catch (error) {
    res.status(500).send("Error in sending email");
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(400)
        .send("Password reset token is invalid or has expired");

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.send("Password has been reset");
  } catch (error) {
    res.status(500).send("Error in resetting password");
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userData = req.user;

    const userId = userData.id;
    const user = await User.findById(userId).select("password");

    res.status(200).json({ user });
    //   res.status(200).json({ message: "get api for profile working" });
  } catch (err) {
    console.log("we got an error", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    // const userData = req.user;
    const userId = req.params.id;

    console.log("we got an update profile request", userId);

    const updatedProfile = req.body;

    console.log("update profile", updatedProfile);

    const response = await User.findByIdAndUpdate(userId, updatedProfile, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ response });
  } catch (err) {
    console.log("we got an error", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
