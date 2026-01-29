import { Router } from "express";
import { register, login } from "../controllers/authcontroller.js";
import { verifyFirebaseToken } from "../middleware/firebaseAuthMiddleware.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

// Google OAuth (Firebase)
authRouter.post("/google", verifyFirebaseToken, (req, res) => {
  res.json({
    uid: req.user.uid,
    email: req.user.email,
    name: req.user.name,
  });
});

export default authRouter;
