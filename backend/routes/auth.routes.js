import { Router } from "express";
import { register, login } from "../controllers/authcontroller.js";
import { verifyFirebaseToken } from "../middlewares/firebase.js";

const authRouter = Router();

// Normal auth
authRouter.post("/register", register);
authRouter.post("/login", login);

// Google Auth (Firebase)
import User from "../models/usermodel/register.js"; // 👈 make sure this exists

authRouter.post("/google", verifyFirebaseToken, async (req, res) => {
  try {
    const { uid, email, name } = req.user;

    // 🔍 Check if user exists
    let user = await User.findOne({ email });

    // 🆕 If not → create user
    if (!user) {
      user = await User.create({
        email,
        name,
        password: uid, // Store Firebase UID as password (or use a random string)
      });
    }

    // ✅ Return user
    res.json({
      message: "Login successful",
      user,
    });

  } catch (err) {
    console.error("Google auth error:", err);
    res.status(500).json({ error: "Server error" });
  }
});
export default authRouter;