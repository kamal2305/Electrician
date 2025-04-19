const Notification = require("../models/Notification");

exports.getNotifications = async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(notifications);
};

exports.markAsRead = async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { read: true });
  res.json({ message: "Notification marked as read." });
};

exports.createNotification = async (userId, message, type = "info") => {
  await Notification.create({ user: userId, message, type });
};
