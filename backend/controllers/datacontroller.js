import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/usermodel/register.js";
import product from "../models/productmodel/product.js";

export const getrelevantproducts = async (req, res) => {
  try {
    const userId = req.user.id;
    const products = await product.find({ userId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};