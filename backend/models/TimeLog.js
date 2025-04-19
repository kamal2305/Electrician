const mongoose = require("mongoose");

const timeLogSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  electrician: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  hoursWorked: { type: Number, required: true },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("TimeLog", timeLogSchema);
