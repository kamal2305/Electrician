const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, default: "Pending", enum: ["Pending", "In Progress", "Completed"] },
  dueDate: Date,
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
