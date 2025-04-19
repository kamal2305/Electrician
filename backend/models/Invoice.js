const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  electrician: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  timeLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "TimeLog" }],
  materialLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "MaterialUsage" }],
  totalLaborCost: Number,
  totalMaterialCost: Number,
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
