import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import authrouter from "./routes/auth.routes.js";
import wishlistRoutes from "./routes/wish.routes.js";
import recommendRoutes from "./routes/recommend.js";
import authMiddleware from "./middlewares/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// ---------------- Middleware ----------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

// ---------------- CORS ----------------
const allowedOrigins = [
  "http://localhost:5173",
  "https://styleora-three.vercel.app"
  "https://styleora-git-main-swasti-jains-projects-907d0f55.vercel.app",
  "https://styleora-d456w91r7-swasti-jains-projects-907d0f55.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman/mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ---------------- MongoDB ----------------
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log(err));

// ---------------- Routes ----------------
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/api/auth", authrouter);
app.use("/api", recommendRoutes);
app.use("/api/wishlist", wishlistRoutes);

// ---------------- Auth Check ----------------
app.get("/api/auth/check", authMiddleware, (req, res) => {
  return res.status(200).json({
    authenticated: true,
    user: req.user,
  });
});

// ---------------- Start Server ----------------
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
