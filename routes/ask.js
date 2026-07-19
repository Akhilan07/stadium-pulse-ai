const express = require("express");
const router = express.Router();
const { Groq } = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Input prompt message is required." });

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `ROLE: Core Intelligence Orchestrator for StadiumPulse AI (FIFA World Cup 2026).
          TASK: Process live multi-agent tournament inputs.
          CRITICAL CONSTRAINTS: Output strictly a single valid JSON object. Do not include markdown code block syntax.
          SCHEMA: { "incident_detected": true, "severity_level": "HIGH", "category": "CROWD_MANAGEMENT", "description": "Status summary.", "staff_action_plan": ["Action 1"], "fan_notification_copy": { "en": "Alert", "es": "Alerta" } }`
        },
        { role: "user", content: message }
      ],
      model: "llama3-8b-8192",
      response_format: { type: "json_object" }
    });

    res.json(JSON.parse(completion.choices[0].message.content));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
