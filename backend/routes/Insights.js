const express = require("express");
const { protect } = require("../middleware/auth");
const Job = require("../models/Job");
const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id });

    if (jobs.length === 0)
      return res.status(400).json({ message: "Add at least 1 job application to get insights." });

    // Build summary for Gemini
    const summary = {
      total: jobs.length,
      statuses: {},
      companies: jobs.map(j => j.company),
      roles: jobs.map(j => j.role),
      dates: jobs.map(j => j.date),
    };
    jobs.forEach(j => {
      summary.statuses[j.status] = (summary.statuses[j.status] || 0) + 1;
    });

    const prompt = `
You are a job hunt coach AI. Analyze this student's job application data and give honest, helpful, specific insights.

Application Data:
- Total Applications: ${summary.total}
- Status Breakdown: ${JSON.stringify(summary.statuses)}
- Companies Applied To: ${summary.companies.join(", ")}
- Roles Applied To: ${summary.roles.join(", ")}
- Application Dates: ${summary.dates.join(", ")}

Return ONLY a valid JSON object (no markdown, no backticks) with this exact structure:
{
  "healthScore": <number 0-100>,
  "healthLabel": "<Excellent|Good|Average|Needs Work>",
  "summary": "<2 sentence overall summary>",
  "insights": [
    { "title": "<insight title>", "description": "<2 sentence insight>", "type": "<positive|warning|tip>" },
    { "title": "<insight title>", "description": "<2 sentence insight>", "type": "<positive|warning|tip>" },
    { "title": "<insight title>", "description": "<2 sentence insight>", "type": "<positive|warning|tip>" },
    { "title": "<insight title>", "description": "<2 sentence insight>", "type": "<positive|warning|tip>" }
  ],
  "tips": [
    "<actionable tip 1>",
    "<actionable tip 2>",
    "<actionable tip 3>"
  ]
}`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { 
            temperature: 0.7, 
            maxOutputTokens: 2000,
            thinkingConfig: {
              thinkingBudget: 0
            }
          },
        }),
      }
    );

    const geminiData = await geminiRes.json();
    const raw = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const clean = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    res.json(parsed);
  } catch (err) {
    console.error("Insights error:", err);
    res.status(500).json({ message: "Failed to generate insights. Try again." });
  }
});

module.exports = router;