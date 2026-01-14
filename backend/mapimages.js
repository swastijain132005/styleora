// autoMapImages.js
const Product = require('./models/Product'); // adjust path if needed
import cloudinary from './cloudconfig.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Connect to MongoDB

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, {
    
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));


// Helper: fetch images from Cloudinary folder
async function getImagesByFolder(folder) {
  const result = await cloudinary.api.resources({
    type: 'upload',
    prefix: folder,
    max_results: 100, // increase or handle pagination if needed
  });
  return result.resources.map((res) => res.secure_url);
}

async function mapImagesToProducts() {
  try {
    const products = await Product.find();
    console.log(`Found ${products.length} products.`);

    const imageCache = {};

    for (const product of products) {
      const folder = `styleora/${product.category}/${product.subCategory}`;

      // fetch images only once per folder
      if (!imageCache[folder]) {
        const images = await getImagesByFolder(folder);
        if (!images.length) {
          console.warn(`No images found for folder: ${folder}`);
          continue;
        }
        imageCache[folder] = images;
      }

      const images = imageCache[folder];
      const randomImage = images[Math.floor(Math.random() * images.length)];

      product.imageUrl = randomImage;
      await product.save();

      console.log(`✅ Updated: ${product.name}`);
    }

    console.log('🎉 All products updated with images!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

mapImagesToProducts();
