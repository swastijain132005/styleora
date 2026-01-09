
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String,
    required: true
  },
  
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
 stock: {
    type: Number,
    required: true
 },
   reviews: {
    type: Number,
    required: true
},
availableSizes: {
  type: [String],
  required: true
},
colors: {
  type: [String],
  required: true
},
season: {
  type: String,
  required: true
},
imageUrl: {
  type: String,
  required: true
}
});

export default mongoose.model("Product", ProductSchema);