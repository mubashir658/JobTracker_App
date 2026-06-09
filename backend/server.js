const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");


const insightsRoutes = require("./routes/Insights");

const app = express();

// Allow multiple client origins via CLIENT_URLS (comma-separated) or single CLIENT_URL.
const CLIENT_URLS = (process.env.CLIENT_URLS || process.env.CLIENT_URL || "").split(",").map(u => u.trim()).filter(Boolean);
// Custom CORS handling to ensure preflight responses include the correct headers
app.use((req, res, next) => {
  const origin = req.headers.origin;
  // allow non-browser requests (no origin header)
  if (!origin) return next();
  // If no CLIENT_URLS configured, allow all origins
  if (CLIENT_URLS.length === 0 || CLIENT_URLS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    if (req.method === "OPTIONS") return res.sendStatus(204);
    return next();
  }
  res.status(403).json({ message: "CORS origin denied" });
});
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/insights", insightsRoutes);

app.get("/", (req, res) => res.json({ message: "JobTracker API running " }));

// Connect DB & Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000} `)
    );
  })
  .catch(err => console.error("DB connection error:", err));