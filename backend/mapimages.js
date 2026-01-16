// autoMapImages.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cloudinary from './cloudconfig.js';
import Product from './models/productmodel/product.js';

dotenv.config();

/* -------------------- MongoDB Connection -------------------- */

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

/* -------------------- Helpers -------------------- */

// Normalize category/subCategory to match Cloudinary folders
function normalize(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       // spaces → hyphens
    .replace(/[^a-z0-9-]/g, ''); // remove special chars
}

// Fetch images from Cloudinary folder
async function getImagesByFolder(folder) {
  const result = await cloudinary.api.resources({
    type: 'upload',
    prefix: folder,
    max_results: 100,
  });

  return result.resources.map((res) => res.secure_url);
}

/* -------------------- Main Logic -------------------- */

async function mapImagesToProducts() {
  try {
    const products = await Product.find();
    console.log(`🛒 Found ${products.length} products`);

    const imageCache = {};

    for (const product of products) {
      const category = normalize(product.category);
      const subCategory = normalize(product.subCategory);
      const folder = `styleora/${category}/${subCategory}`;

      console.log(`📂 Checking folder: ${folder}`);

      // Fetch images only once per folder
      if (!imageCache[folder]) {
        const images = await getImagesByFolder(folder);

        if (!images.length) {
          console.warn(`⚠️ No images found for ${folder}`);
          continue;
        }

        imageCache[folder] = images;
      }

      const images = imageCache[folder];
      const randomImage =
        images[Math.floor(Math.random() * images.length)];

      product.imageUrl = randomImage;
      await product.save();

      console.log(`✅ Updated: ${product.name}`);
    }

    console.log('🎉 All products updated successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
}

/* -------------------- Run Script -------------------- */

mapImagesToProducts();
