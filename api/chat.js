export default async function handler(req, res) {
  const API_KEY = process.env.OPENROUTER_API_KEY;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://ai-website-asep.vercel.app",
        "X-Title": "AI Website Asep"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "system", content: "Kamu AI santai dan ramah" },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

if (!response.ok) {
  return res.status(500).json({
    error: data.error?.message || "API Error",
    full: data
  });
}

return res.status(200).json({
  reply: data.choices?.[0]?.message?.content || "Tidak ada respon"
});
