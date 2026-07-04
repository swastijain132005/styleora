import Wish from "../models/wishlistmodel/wish.js";
import User from "../models/usermodel/register.js";
import Product from "../models/productmodel/product.js";

export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;
    const exists = await Wish.findOne({ user: userId, product: productId });
    if (exists) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }
    const wish = new Wish({ user: userId, product: productId });
    await wish.save();
    return res.status(200).json({ message: "Product added to wishlist" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params.productId;
    const exists = await Wish.findOne({ user: userId, product: productId });
    if (!exists) {
      return res.status(400).json({ message: "Product not in wishlist" });
    }
    await Wish.findOneAndDelete({ user: userId, product: productId });
    return res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlist = await Wish.find({ user: userId }).populate("product");
    return res.status(200).json(wishlist);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const checkWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params.productId;
    const exists = await Wish.findOne({ user: userId, product: productId });
    res.json({ exists: !!exists });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};