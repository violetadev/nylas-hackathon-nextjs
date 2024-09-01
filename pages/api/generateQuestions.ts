import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let monthlyUsage = 0;
const monthlyBudgetInTokens = 5000000; // 5 million tokens

export default async function handler(req, res) {
  if (monthlyUsage >= monthlyBudgetInTokens) {
    console.log("Monthly budget reached. No more API requests will be made.");
    return res
      .status(403)
      .json({ error: "Monthly API budget has been reached." });
  }

  if (req.method === "POST") {
    const { eventDescription, user1Notes, user2Notes } = req.body;

    const prompt = `Event: ${eventDescription}, Person 1: ${user1Notes}, Person 2: ${user2Notes}. Generate 5 icebreaker questions (45 characters or less) for their first time meeting`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
      });

      console.log(response, "OpenAI response");

      if (response?.choices && response.choices.length > 0) {
        const questions = response.choices[0].message?.content
          ?.trim()
          .split("\n")
          .filter((q) => q.trim() !== "");

        // Update monthly usage
        const tokensUsed = response.usage?.total_tokens || 0;
        monthlyUsage += tokensUsed;

        res.status(200).json({ questions });
      } else {
        res.status(500).json({ error: "No valid response from OpenAI" });
      }
    } catch (error) {
      if (error.status === 429) {
        console.error("Rate limit exceeded:", error);
        res
          .status(429)
          .json({ error: "Rate limit exceeded. Please try again later." });
      } else {
        console.error("Error generating questions:", error);
        res.status(500).json({ error: "Failed to generate questions" });
      }
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
