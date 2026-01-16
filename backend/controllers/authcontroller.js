import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/usermodel/register.js";

// ---------------------------------------------------
// REGISTER
// ---------------------------------------------------
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password)
      return res.status(400).json({ message: "Please fill all fields" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hash,
    });

    const token = newUser.generateAuthToken();

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(400).json({ message: "Invalid Credentials" });

    const match = await bcrypt.compare(password, existingUser.password);
    if (!match)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        username: existingUser.username,
        profilepicture: existingUser.profilepicture,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};