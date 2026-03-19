import dotenv from "dotenv";
dotenv.config();

const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

// 🔥 1. FILTER GENERATION
export const getFiltersFromAI = async (
  skinTone,
  gender,
  age,
  subCategory,
  season,
  size
) => {
  const prompt = `
You are a fashion expert.

User details:
- Skin tone: ${skinTone}
- Gender: ${gender}
- Age: ${age}
- Wants: ${subCategory}
- Season: ${season}
- Size: ${size}

Choose suitable colors ONLY from:
Black, White, Navy Blue, Grey, Olive, Maroon, Beige, Brown, Charcoal, Teal

Return ONLY valid JSON:
{
  "colors": ["olive", "navy blue"]
}
`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 80,
          temperature: 0.5,
        },
      }),
    });

    const data = await response.json();

    // 🔥 fallback
    let filters = {
      colors: ["black", "blue"],
    };

    // 🔥 safer parsing
    try {
      const text = data[0]?.generated_text || "";

      const start = text.indexOf("{");
      const end = text.lastIndexOf("}");

      if (start !== -1 && end !== -1) {
        const jsonString = text.slice(start, end + 1);
        filters = JSON.parse(jsonString);
      }
    } catch (err) {
      console.log("Parse error");
    }

    return filters;

  } catch (error) {
    console.error("AI Error:", error);
    return {
      colors: ["black", "blue"],
    };
  }
};


// 🔥 2. EXPLANATION GENERATION
export const getExplanationFromAI = async (
  skinTone,
  gender,
  age,
  subCategory,
  season,
  size,
  filters
) => {
  const prompt = `
You are a fashion expert.

User details:
- Skin tone: ${skinTone}
- Gender: ${gender}
- Age: ${age}
- Clothing: ${subCategory}
- Season: ${season}
- Size: ${size}

Recommended colors: ${filters.colors.join(", ")}

Explain in 2 short sentences why these colors suit the user.
`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
      },
      body: JSON.stringify(
        {
        inputs: prompt,
        parameters: {
          max_new_tokens: 60,
          temperature: 0.6,
        },
      }),
    });

    const data = await response.json();

    return (
      data[0]?.generated_text ||
      "These colors complement your profile and enhance your look."
    );

  } catch (error) {
    console.error("Explanation Error:", error);
    return "Recommended based on your preferences.";
  }
};