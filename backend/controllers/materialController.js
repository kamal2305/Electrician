const MaterialUsage = require("../models/MaterialUsage");

exports.addMaterialUsage = async (req, res) => {
  try {
    const entry = await MaterialUsage.create({
      ...req.body,
      electrician: req.user._id,
    });
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMaterialsByElectrician = async (req, res) => {
  try {
    const entries = await MaterialUsage.find({ electrician: req.user._id }).populate("job", "title");
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllMaterialUsages = async (req, res) => {
  try {
    const entries = await MaterialUsage.find().populate("job", "title").populate("electrician", "name");
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
