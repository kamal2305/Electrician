const TimeLog = require("../models/TimeLog");

exports.createTimeLog = async (req, res) => {
  try {
    const timeLog = await TimeLog.create({
      ...req.body,
      electrician: req.user._id
    });
    res.status(201).json(timeLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMyTimeLogs = async (req, res) => {
  try {
    const logs = await TimeLog.find({ electrician: req.user._id }).populate("job", "title");
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllTimeLogs = async (req, res) => {
  try {
    const logs = await TimeLog.find().populate("job", "title").populate("electrician", "name");
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
