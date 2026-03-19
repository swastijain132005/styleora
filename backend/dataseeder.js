import mongoose from "mongoose";
import Product from "./models/productmodel/product.js";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;

async function updateProducts() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    const count = await Product.countDocuments();
    console.log("Total products:", count);

    const result = await Product.updateMany(
      {},
      { $set: { occasion: "daily" } },
      { writeConcern: { w: 1 } } 
    );

    console.log("Update result:", result);

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

updateProducts();