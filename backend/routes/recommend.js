import express from "express";
import { getRecommendations } from "../controllers/recommend.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post("/recommend", authMiddleware, getRecommendations);

export default router;