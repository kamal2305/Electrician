const User = require("../models/User");

exports.getElectricians = async (req, res) => {
  try {
    const electricians = await User.find({ role: "electrician" }).select("-password");
    res.json(electricians);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addElectrician = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const newUser = await User.create({
      name,
      email,
      password: await require("bcryptjs").hash(password, 10),
      role: "electrician",
    });

    res.status(201).json({ message: "Electrician added", user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteElectrician = async (req, res) => {
  try {
    const electrician = await User.findById(req.params.id);
    if (!electrician || electrician.role !== "electrician")
      return res.status(404).json({ message: "Electrician not found" });

    await electrician.remove();
    res.json({ message: "Electrician deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
