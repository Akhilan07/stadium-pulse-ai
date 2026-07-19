require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Gen AI Action Endpoints
app.use("/api/ask", require("./routes/ask"));
app.use("/api/semantic-search", require("./routes/semanticSearch"));

app.get("/", (req, res) => {
  res.send("StadiumPulse AI API Engine Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
