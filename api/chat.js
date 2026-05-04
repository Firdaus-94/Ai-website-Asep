export default async function handler(req, res) {
export default async function handler(req, res) {
  const API_KEY = process.env.OPENAI_API_KEY;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_KEY
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Kamu AI santai dan ramah" },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    console.log("OPENAI RESPONSE:", data);

    const reply =
      data?.choices?.[0]?.message?.content ||
      data?.choices?.[0]?.text ||
      "❌ AI tidak merespon";

    return res.status(200).json({ reply });

  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}
