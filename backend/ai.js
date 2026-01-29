import fetch from "node-fetch";

export async function getExplanation(user, product) {
  const prompt = `
You are a fashion stylist.

User details:
- Skin tone: ${user.skinTone}
- Body type: ${user.bodyType}

Product details:
- Category: ${product.category}
- Color: ${product.color}
- Fit: ${product.fit}

Explain in 1–2 simple sentences why this product suits the user.
Avoid generic statements.
`;

  const response = await fetch(
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 70,
          temperature: 0.6,
        },
      }),
    }
  );

  const data = await response.json();

  return data?.[0]?.generated_text || "Recommended based on your profile.";
}
