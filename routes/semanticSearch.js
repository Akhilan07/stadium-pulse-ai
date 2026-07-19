const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Query context string is mandatory." });

    const { pipeline } = await import("@xenova/transformers");
    const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    const tensorOutput = await embedder(query, { pooling: 'mean', normalize: true });
    const structuralVector = Array.from(tensorOutput.data);

    res.json({ query, vector: structuralVector, dimensions: structuralVector.length, status: "Vector processing successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
