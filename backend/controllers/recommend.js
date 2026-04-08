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

        let  filters = await getFiltersFromAI(
            skinTone,
            gender,
            age,
            subCategory,
            season,
            size
        );

        let products =await product.find({
            category: gender.toLowerCase(),
            subCategory: subCategory.toLowerCase(),
            colors: { $in: filters.colors },
            season: season.toLowerCase(),
            availableSizes: size,
        }).limit(10);

        if (products.length === 0) {
            console.log("relaxing 1st time");
       products=    await product.find({
                category: gender.toLowerCase(),
                subCategory: subCategory.toLowerCase(),
                colors: { $in: filters.colors },
                availableSizes: size,
            })

        }

        if (products.length === 0) {
            console.log("relaxing 2nd time");
            products=    await product.find({
                category: gender.toLowerCase(),
                colors: { $in: filters.colors },
            }).limit(10)
        }

        if (products.length === 0) {
return res.json({ results: [] });
        }
        const explanation = await getExplanationFromAI(

            skinTone,
  gender,
  age,
  subCategory,
  season,
  size,
  filters
        );

        const finalProducts = products.map((p) => ({
            ...p._doc,
            recommendedStyle: filters.style,
            reason: explanation
        }));

        return res.json({
            filters,
            results: finalProducts
        })

        





        }

        


    
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};