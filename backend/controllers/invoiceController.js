const Invoice = require("../models/Invoice");
const TimeLog = require("../models/TimeLog");
const MaterialUsage = require("../models/MaterialUsage");

exports.generateInvoice = async (req, res) => {
  try {
    const { jobId, electricianId } = req.body;

    const timeLogs = await TimeLog.find({ job: jobId, electrician: electricianId });
    const materialLogs = await MaterialUsage.find({ job: jobId, electrician: electricianId });

    const totalLaborCost = timeLogs.reduce((sum, log) => sum + log.hoursWorked * 100, 0); // ₹100/hour
    const totalMaterialCost = materialLogs.reduce((sum, item) => sum + item.quantity * item.unitCost, 0);
    const totalAmount = totalLaborCost + totalMaterialCost;

    const invoice = await Invoice.create({
      job: jobId,
      electrician: electricianId,
      timeLogs: timeLogs.map((t) => t._id),
      materialLogs: materialLogs.map((m) => m._id),
      totalLaborCost,
      totalMaterialCost,
      totalAmount,
    });

    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("job", "title")
      .populate("electrician", "name")
      .populate("timeLogs")
      .populate("materialLogs");

    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
