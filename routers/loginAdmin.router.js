const express = require("express");
const loginAdmin = require("../models/loginAdmin.model");
const bcrypt = require("bcrypt");
const router = express.Router();

// ? Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { EmailId, Password, LicenseNo } = req.body;

    // Check if EmailId, Password, and LicenseNo are provided
    if (!EmailId || !Password || !LicenseNo) {
      return res.status(400).send("EmailId, Password, and LicenseNo are required");
    }

    // Check if LicenseNo is valid
    if (LicenseNo !== "opensoft") {
      return res.status(400).send("Invalid LicenseNo");
    }

    // Check if the user already exists
    const existingUser = await loginAdmin.findOne({ EmailId });
    if (existingUser) {
      return res
        .status(400)
        .send("User already exists, Please choose a different EmailId");
    }

    // Hash the Password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create the new user
    const userdata = await loginAdmin.create({
      EmailId,
      Password: hashedPassword,
      LicenseNo,
    });
    console.log(userdata);

    // Send success response
   // In the backend route (Node.js Express)

res.status(200).json({ message: "User registered successfully" });

  } catch (err) {
    console.error("Error during signup: ", err);
    res.status(400).send("An error occurred while signing up");
  }
});

// ? Login Route
router.post("/login", async (req, res) => {
  try {
    const { EmailId, Password } = req.body;

    // Check if EmailId and Password are provided
    if (!EmailId || !Password) {
      return res.status(400).send("EmailId and Password are required");
    }

    // Check if the user exists
    const user = await loginAdmin.findOne({ EmailId });
    if (!user) {
      return res.status(404).json({
        error: "EmailId not found",
      });
    }

    // Compare the entered Password with the stored hash
    const isPasswordMatch = await bcrypt.compare(Password, user.Password);

    if (isPasswordMatch) {
      return res.status(200).json({
        message: "Login successful",
        user: user.EmailId, // Send the EmailId or any other user-specific data
      });
    } else {
      return res.status(400).json({
        error: "Incorrect Password",
      });
    }
  } catch (err) {
    console.error("Error during login: ", err);
    res.status(400).json({
      error: "Internal server error",
    });
  }
});

module.exports = router;
