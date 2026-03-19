import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/usermodel/register.js";
import product from "../models/productmodel/product.js";
import { getExplanation} from "../ai.js";


export const getExplanationController = async (req, res) => {
  try {  

    
    }catch (error) {
    res.status(500).json({ error: "Failed to get explanation" });
  }
}