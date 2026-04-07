


import { Router } from "express";
import { register, login } from "../controllers/authcontroller.js";
import { refreshToken } from "../controllers/authcontroller.js";
import { verifyFirebaseToken } from "../middlewares/firebase.js";
import User from "../models/usermodel/register.js"; // 👈 make sure this exists


const authRouter = Router();

// Normal auth
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/refresh-token", refreshToken);



authRouter.post("/google", verifyFirebaseToken, async (req, res) => {
  try {
    const { uid, email, name } = req.user;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name,
        password: uid,
      });
    }

    const Accesstoken = user.generateAuthToken();
    const refreshToken = user.generaterefreshToken();

    // ✅ SET COOKIE + SEND RESPONSE (ONLY ONCE)
    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .status(200)
      .json({
        message: "Login successful",
        user,
        Accesstoken,
      });

  } catch (err) {
    console.error("Google auth error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});