async function query(data) {
  const response = await fetch(
    "https://router.huggingface.co/v1/chat/completions",
    {
      headers: {
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  // ✅ ERROR HANDLING MUST BE HERE
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`HF Error: ${err}`);
  }

  return response.json();
}

query({
  model: "mistralai/Mistral-7B-Instruct-v0.2",
  messages: [
    {
      role: "user",
      content: "What is the capital of France?",
    },
  ],
  max_tokens: 50,
  temperature: 0.3
})
.then((response) => {
  console.log(response.choices[0].message.content);
})
.catch((err) => {
  console.error(err.message);
});
