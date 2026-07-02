import product from "../models/productmodel/product.js";
import { getFiltersFromAI, getExplanationFromAI } from "../ai.js";

export const getRecommendations = async (req, res) => {
  try {
    const {
      skinTone,
      gender,
      age,
      subCategory,
      season,
      size,
    } = req.body;

    console.log("Received data:", req.body);

    // ✅ Normalize seasons
    const seasons = Array.isArray(season) ? season : [season];
    const normalizedSeasons = seasons.map(s =>
      String(s).toLowerCase()
    );

    const seasonMap = {
      spring: "summer",
      autumn: "winter"
    };

    const mappedSeasons = normalizedSeasons.map(s =>
      seasonMap[s] || s
    );

    // ✅ AI filters
    let filters = await getFiltersFromAI(
      skinTone,
      gender,
      age,
      subCategory,
      mappedSeasons,
      size
    );

    // 🔥 STEP 1: Fetch BROADER data (NOT strict)
    let products = await product.find().limit(50);

    console.log("Products fetched:", products.length);

if (products.length > 0) {
  console.log(products[0]);
}

    // 🔥 STEP 2: Score products
    const scoredProducts = products.map(p => {
      let score = 0;

      // category (already filtered but still count)
      if (p.category.toLowerCase() === gender.toLowerCase()) {
        score += 3;
      }

      // subCategory
      if (p.subCategory.toLowerCase().includes(subCategory.toLowerCase())) {
        score += 3;
      }

      // size
      if (p.availableSizes.includes(size)) {
        score += 2;
      }

      // season
      if (mappedSeasons.includes(p.season.toLowerCase())) {
        score += 1;
      }

      // color
      if (filters.colors.some(color =>
        p.colors.map(c => c.toLowerCase()).includes(color.toLowerCase())
      )) {
        score += 1;
      }

      return { ...p._doc, score };
    });

    // 🔥 STEP 3: Sort by score
    scoredProducts.sort((a, b) => b.score - a.score);

    // 🔥 STEP 4: Take top 10
    const topProducts = scoredProducts.slice(0, 10);

    if (topProducts.length === 0) {
      return res.json({ results: [] });
    }

    // ✅ Explanation
    const explanation = await getExplanationFromAI(
      skinTone,
      gender,
      age,
      subCategory,
      mappedSeasons,
      size,
      filters
    );

    const finalProducts = topProducts.map(p => ({
      ...p,
      recommendedStyle: filters.style,
      reason: explanation
    }));

    return res.json({
      filters,
      results: finalProducts
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};