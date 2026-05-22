const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  company: { type: String, required: true, trim: true },
  role:    { type: String, required: true, trim: true },
  date:    { type: String, required: true },
  status:  { type: String, enum: ["Applied", "Screening", "Interview", "Offer", "Rejected"], default: "Applied" },
  notes:   { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);