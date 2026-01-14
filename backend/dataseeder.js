



// ----------------------
// Data pools
// ----------------------

const menItems = [
  { sub: "tshirts", sizes: ["S","M","L","XL"], colors:["Black","White","Blue","Grey"] },
  { sub: "shirts", sizes: ["M","L","XL"], colors:["White","Blue","Checks"] },
  { sub: "jeans", sizes: ["30","32","34","36"], colors:["Blue","Black"] },
  { sub: "trousers", sizes:["30","32","34"], colors:["Black","Beige"] },
  { sub: "jackets", sizes:["M","L","XL"], colors:["Black","Brown"] },
  { sub: "hoodies", sizes:["M","L","XL"], colors:["Grey","Black"] },
  { sub: "kurtas", sizes:["M","L","XL"], colors:["White","Maroon"] }
];

const womenItems = [
  { sub:"dresses", sizes:["S","M","L"], colors:["Red","Black","Pink"] },
  { sub:"tops", sizes:["S","M","L"], colors:["White","Blue"] },
  { sub:"kurtis", sizes:["S","M","L"], colors:["Yellow","Green"] },
  { sub:"sarees", sizes:["Free"], colors:["Red","Blue","Golden"] },
  { sub:"jeans", sizes:["28","30","32"], colors:["Blue","Black"] }
];

const brands = ["Zara","H&M","Roadster","Nike","Puma","Biba","Allen Solly","Levis"];

const seasons = ["Summer","Winter","spring","Autumn"];

const getRandom = (arr) => arr[Math.floor(Math.random()*arr.length)];
const getPrice = (sub) => {
  if(sub.includes("jeans") || sub.includes("jacket")) return Math.floor(Math.random()*2000)+2000;
  return Math.floor(Math.random()*1000)+800;
};

const seedProducts = async () => {
  try {
    await connectDB();

    const products = [];

    for (let i = 1; i <= 150; i++) {
      const item = getRandom(menItems);
      products.push({
        name: `Men ${item.sub} ${i}`,
        brand: getRandom(brands),
        category: "men",
        subCategory: item.sub,
        price: getPrice(item.sub),
        availableSizes: item.sizes,
        colors: item.colors,
        season: getRandom(seasons),
        imageUrl: "placeholder"
      });
    }

    for (let i = 1; i <= 150; i++) {
      const item = getRandom(womenItems);
      products.push({
        name: `Women ${item.sub} ${i}`,
        brand: getRandom(brands),
        category: "women",
        subCategory: item.sub,
        price: getPrice(item.sub),
        availableSizes: item.sizes,
        colors: item.colors,
        season: getRandom(seasons),
        imageUrl: "placeholder"
      });
    }

    await Product.deleteMany();   // optional: clean before insert
    await Product.insertMany(products);

    console.log("🔥 300 Products Successfully Seeded");
    process.exit();

  } catch (err) {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  }
};

seedProducts();