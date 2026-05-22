const express = require("express");
const Job = require("../models/Job");
const { protect } = require("../middleware/auth");
const router = express.Router();

// All routes protected
router.use(protect);

// GET /api/jobs — get all jobs for logged in user
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/jobs — add new job
router.post("/", async (req, res) => {
  const { company, role, date, status, notes } = req.body;
  if (!company || !role || !date)
    return res.status(400).json({ message: "Company, role and date are required" });
  try {
    const job = await Job.create({ user: req.user._id, company, role, date, status, notes });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// PUT /api/jobs/:id — update job
router.put("/:id", async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, user: req.user._id });
    if (!job) return res.status(404).json({ message: "Job not found" });
    const { company, role, date, status, notes } = req.body;
    job.company = company || job.company;
    job.role    = role    || job.role;
    job.date    = date    || job.date;
    job.status  = status  || job.status;
    job.notes   = notes  !== undefined ? notes : job.notes;
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE /api/jobs/:id — delete job
router.delete("/:id", async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;