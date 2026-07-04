console.log("Wishlist routes loaded");



import express from "express";
const router = express.Router();
import authMiddleware from "../middlewares/auth.js";
import { addToWishlist, removeFromWishlist, getWishlist ,checkWishlist} from "../controllers/wishcontroller.js";
router.use(authMiddleware);
router.post ("/",addToWishlist)
router.delete("/:productId",removeFromWishlist);
router.get("/check/:productId",checkWishlist);
router.get("/",getWishlist);
export default router;