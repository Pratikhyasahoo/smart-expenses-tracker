// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try{
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }
  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed
  });
 res.status(201).json(user);
  res.json(user);
}catch(error){
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
 }
};

exports.login = async (req, res) => {
  try{
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json("Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "fallback_secret",{expireIn:"1d"});
res.status(200).json({ token,
  user:{
    id:user._id,
    name:user.name,
    email:user.email
  }
});
  }catch(error){
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};