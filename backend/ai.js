import dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";

const API_URL = "https://openrouter.ai/api/v1/chat/completions";

/* ===========================
   🔧 HELPER: OPENROUTER CALL
=========================== */
const callAI = async (prompt) => {
  try {
    console.log("📤 Sending to OpenRouter...");
    console.log("API KEY:", process.env.AI_API_KEY);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
  "Authorization": `Bearer ${process.env.AI_API_KEY}`,
  "Content-Type": "application/json",
  "HTTP-Referer": "http://localhost:3000",
  "X-Title": "styleora"
},
      body: JSON.stringify({
        model: "google/gemma-4-26b-a4b-it:free",
        messages: [
          { role: "user", content: prompt }
        ],
        temperature: 0.6,
        max_tokens: 150
      })
    });
    console.log("AUTH HEADER:", `Bearer ${process.env.AI_API_KEY}`);

    const data = await response.json();

    console.log("📥 OPENROUTER RAW:", data);

    const text = data?.choices?.[0]?.message?.content || null;

    return text;

  } catch (error) {
    console.error("❌ OPENROUTER ERROR:", error.message);
    return null;
  }
};

/* ===========================
   🎨 FILTER GENERATION
=========================== */
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

User:
Skin tone: ${skinTone}
Gender: ${gender}
Age: ${age}
Clothing: ${subCategory}
Season: ${season}
Size: ${size}

Choose ONLY from:
Black, White, Navy Blue, Grey, Olive, Maroon, Beige, Brown, Charcoal, Teal

Return ONLY JSON:
{"colors":["black","navy blue"]}
`;

  const text = await callAI(prompt);

  let filters = { colors: ["black", "blue"] };

  if (!text) {
    console.log("⚠️ Using fallback filters");
    return filters;
  }

  try {
    const match = text.match(/\{[\s\S]*\}/);

    if (match) {
      const parsed = JSON.parse(match[0]);

      if (Array.isArray(parsed.colors)) {
        filters = parsed;
      }
    }
  } catch (err) {
    console.log("❌ Filter parse error");
  }

  console.log("✅ FINAL FILTERS:", filters);

  return filters;
};

/* ===========================
   🧠 EXPLANATION GENERATION
=========================== */
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
You are a fashion stylist.

User:
Skin tone: ${skinTone}
Gender: ${gender}
Age: ${age}
Clothing: ${subCategory}
Season: ${season}
Size: ${size}

Colors: ${filters.colors.join(", ")}

Give ONLY 1-2 short sentences explaining why these colors suit the user.
Do NOT repeat the question.
`;

  const text = await callAI(prompt);

  if (!text) {
    console.log("⚠️ Using fallback explanation");
    return "These colors complement your profile and enhance your look.";
  }

  let cleaned = text.trim();

  if (cleaned.length > 200) {
    cleaned = cleaned.slice(0, 200);
  }

  console.log("✅ FINAL EXPLANATION:", cleaned);

  return cleaned;
};