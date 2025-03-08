const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET;

// Register User
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await User.create(username, email, hashedPassword, "user");

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.user_id, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Return the token and role
    res.status(201).json({ token, role: user.role });
  } catch (err) {
    console.error("Error registering user:", err);
    res
      .status(500)
      .json({
        message: "Registration failed. Email or username may already exist.",
      });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.user_id, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Return the token and role
    res.status(200).json({ token, role: user.role });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Login failed" });
  }
};
