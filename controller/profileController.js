const Profile = require("../model/profile");

// exports.getProfile = async (req, res) => {
//   try {
//     const profileData = req.userId;

//     const profileId = profileData.id;
//     const profile = await Profile.findById(profileId);

//     res.status(200).json({ profile });
//     res.status(200).json({ message: "get api for profile working" });
//   } catch (err) {
//     console.log("we got an error", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
