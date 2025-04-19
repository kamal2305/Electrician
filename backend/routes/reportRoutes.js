const express = require("express");
const router = express.Router();
const {
  getDashboardStats,
  monthlyTimeLogStats,
  electricianPerformance,
} = require("../controllers/reportController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

router.get("/dashboard", protect, adminOnly, getDashboardStats);
router.get("/time-monthly", protect, adminOnly, monthlyTimeLogStats);
router.get("/electrician-performance", protect, adminOnly, electricianPerformance);

module.exports = router;
