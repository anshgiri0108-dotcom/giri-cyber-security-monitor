export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          messages: [
            {
              role: "system",
              content:
                "You are a cybersecurity assistant. Analyze suspicious messages carefully. Do not claim certainty. Return your answer in this exact format:\n\nRISK: Low/Medium/High\n\nANALYSIS:\nExplain the warning signs and why the message may be suspicious.\n\nACTIONS:\nGive practical safe actions the user should take.\n\nDo not claim certainty. Never ask for passwords, OTPs, recovery codes, or other secrets."
            },
            {
              role: "user",
              content: message
            }
          ],
          temperature: 0.2
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "Groq API error"
      });
    }

    return res.status(200).json({
      analysis: data.choices?.[0]?.message?.content || "No analysis returned"
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
