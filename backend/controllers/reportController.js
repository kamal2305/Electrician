const Job = require("../models/Job");
const User = require("../models/User");
const TimeLog = require("../models/TimeLog");
const Invoice = require("../models/Invoice");
const MaterialUsage = require("../models/MaterialUsage");
const mongoose = require("mongoose");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();
    const completedJobs = await Job.countDocuments({ status: "completed" });
    const totalInvoices = await Invoice.countDocuments();
    const totalRevenueData = await Invoice.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const totalRevenue = totalRevenueData[0]?.total || 0;

    res.json({ totalJobs, completedJobs, totalInvoices, totalRevenue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.monthlyTimeLogStats = async (req, res) => {
  try {
    const data = await TimeLog.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          totalHours: { $sum: "$hoursWorked" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.electricianPerformance = async (req, res) => {
  try {
    const performance = await TimeLog.aggregate([
      {
        $group: {
          _id: "$electrician",
          totalHours: { $sum: "$hoursWorked" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "electrician",
        },
      },
      {
        $unwind: "$electrician",
      },
      {
        $project: {
          name: "$electrician.name",
          totalHours: 1,
        },
      },
    ]);
    res.json(performance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
