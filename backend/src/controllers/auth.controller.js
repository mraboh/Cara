const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/User");
const JWT_SECRET = 'mys'

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  // TODO: Implement your logic to register the user
  const user = await Users.findOne({ email });
  if (user) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new Users({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  res.json({ message: "User registered successfully" });
};

// TODO: Implement your login logic here

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ error: "Invalid password" });
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({ message: "Logged in successfully", token });
};
module.exports = { register, login };
