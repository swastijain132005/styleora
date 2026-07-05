import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/usermodel/register.js";

// ---------------------------------------------------
// REGISTER
// ---------------------------------------------------
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hash,
    });

    const accessToken = newUser.generateAuthToken();
    const refreshToken = newUser.generaterefreshToken();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(201).json({
      message: "User registered successfully",
      accessToken,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        profilepicture: newUser.profilepicture,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || "Registration failed",
    });
  }
};

// ---------------------------------------------------
// LOGIN
// ---------------------------------------------------
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Missing fields",
      });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const match = await bcrypt.compare(password, existingUser.password);

    if (!match) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const accessToken = existingUser.generateAuthToken();
    const refreshToken = existingUser.generaterefreshToken();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(200).json({
      message: "Login Successful",
      accessToken,
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        username: existingUser.username,
        profilepicture: existingUser.profilepicture,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || "Login failed",
    });
  }
};

// ---------------------------------------------------
// REFRESH TOKEN
// ---------------------------------------------------
export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "No refresh token provided",
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    const accessToken = user.generateAuthToken();

    return res.status(200).json({
      message: "Refresh successful",
      accessToken,
    });
  } catch (err) {
    return res.status(401).json({
      message: "Invalid refresh token",
    });
  }
};

// ---------------------------------------------------
// LOGOUT
// ---------------------------------------------------
export const logout = (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Logout failed",
    });
  }
};