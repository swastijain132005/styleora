import Product from "./models/Product.js";



const seasons = ["Summer", "Winter", "All Season"];

const catalog = {
  Men: {
    subCategories: [
      "T-Shirts", "Shirts", "Jeans", "Trousers",
      "Jackets", "Hoodies", "Sweatshirts",
      "Kurtas", "Shorts", "Track Pants"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      "Black", "White", "Navy Blue", "Grey",
      "Olive", "Maroon", "Beige", "Brown",
      "Charcoal", "Teal"
    ],
    priceRange: [799, 4999]
  },

  Women: {
    subCategories: [
      "Dresses", "Tops", "Kurtis", "Sarees",
      "Jeans"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      "Red", "Pink", "Wine", "Blue",
      "Green", "Yellow", "Lavender",
      "Peach", "White", "Black", "Mustard"
    ],
    priceRange: [999, 6999]
  },

  Unisex: {
    subCategories: [
      "Oversized T-Shirts",
      "Hoodies",
      "Sweatshirts",
      
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      "Black", "White", "Grey",
      "Beige", "Olive", "Khaki",
      "Navy", "Brown"
    ],
    priceRange: [699, 5499]
  }
};

const brands = [
  "Styleora",
  "UrbanEdge",
  "DenimCo",
  "StreetVibe",
  "Ethniq",
  "Minimal"
];

const adjectives = [
  "Classic",
  "Premium",
  "Slim Fit",
  "Relaxed Fit",
  "Oversized",
  "Casual",
  "Elegant",
  "Modern",
  "Street Style"
];

const descriptions = [
  "Crafted from premium fabric for all-day comfort.",
  "Designed for modern fashion and durability.",
  "Soft and breathable material suitable for daily wear.",
  "Trendy design with a comfortable fit.",
  "Perfect blend of style and comfort."
];

const imageBase =
  "https://via.placeholder.com/300x400?text=Styleora+";

/* ---------------- HELPERS ---------------- */

const random = arr => arr[Math.floor(Math.random() * arr.length)];

const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomSizeSubset = sizes =>
  sizes.filter(() => Math.random() > 0.3);

/* ---------------- SEED FUNCTION ---------------- */

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    console.log("🧹 Old products removed");

    const products = [];

    for (let i = 1; i <= 400; i++) {
      const category = random(Object.keys(catalog));
      const data = catalog[category];
      const subCategory = random(data.subCategories);

      products.push({
        name: `${random(adjectives)} ${subCategory}`,
        brand: random(brands),
        category,
        subCategory,

        price: randomNumber(data.priceRange[0], data.priceRange[1]),
        discount: randomNumber(5, 50),

        availableSizes: randomSizeSubset(data.sizes),
        colors: data.colors,

        season: random(seasons),

        rating: Number((Math.random() * 1.8 + 3.2).toFixed(1)),
        reviews: randomNumber(10, 900),

        stock: randomNumber(10, 120),

        imageUrl: `${imageBase}${subCategory.replace(/ /g, "+")}`,
        description: random(descriptions)
      });
    }

    await Product.insertMany(products);
    console.log("✅ 400 Styleora CLOTHING products seeded");

    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed", error);
    process.exit(1);
  }
};

seedProducts();
