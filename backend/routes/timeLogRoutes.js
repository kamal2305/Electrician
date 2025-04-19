const express = require("express");
const router = express.Router();
const {
  createTimeLog,
  getMyTimeLogs,
  getAllTimeLogs
} = require("../controllers/timeLogController");

const { protect, adminOnly } = require("../middlewares/authMiddleware");

router.post("/", protect, createTimeLog);
router.get("/mine", protect, getMyTimeLogs);
router.get("/", protect, adminOnly, getAllTimeLogs);

module.exports = router;
