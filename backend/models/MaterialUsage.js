const mongoose = require("mongoose");

const materialUsageSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  electrician: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitCost: { type: Number, required: true },
  dateUsed: { type: Date, required: true },
}, { timestamps: true });

materialUsageSchema.virtual("totalCost").get(function () {
  return this.quantity * this.unitCost;
});

module.exports = mongoose.model("MaterialUsage", materialUsageSchema);
