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
app.use(cors({
  origin: (origin, callback) => {
    // allow requests like curl/postman with no origin
    if (!origin) return callback(null, true);
    if (CLIENT_URLS.length === 0) return callback(null, true); // allow all if not configured
    if (CLIENT_URLS.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  }
}));
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