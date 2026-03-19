import express from "express";
import { getRecommendations } from "../controllers/recommend.js";

const router = express.Router();

router.post("/recommend", getRecommendations);

export default router;