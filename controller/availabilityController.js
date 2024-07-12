const Availability = require("../model/availability");
const User = require("../model/user");
const toJsonSchema = require("to-json-schema");

const checkRole = (userId) => {
  try {
    const user = User.findById(userId).select("-password");
    // console.log("user:", user);
    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // console.log(error);
    return false;
  }
};

exports.getAvailability = async (req, res) => {
  try {
    const availabilities = await Availability.find();
    res.json(availabilities);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching availabilities" });
  }
};

exports.postAvailability = async (req, res) => {
  const user = User.findById(req.body.patientId).select("-password");
  const ifRole = user.role === "admin";
  try {
    console.log(req.params.id);
    // if (await checkRole(req.params.id)) {
    //   return res.status(403).json({ message: "Role is not allowed to change" });
    // }

    const data = req.body;

    const newAvailability = new Availability(data);
    const response = await newAvailability.save();
    // console.log(response);
    res.status(200).json({
      response: response,
      message: "Availability updated successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
