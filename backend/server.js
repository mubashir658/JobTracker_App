const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

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