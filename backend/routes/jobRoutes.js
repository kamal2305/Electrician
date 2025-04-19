const express = require("express");
const router = express.Router();
const {
  createJob,
  getAllJobs,
  getElectricianJobs,
  updateJobStatus,
  deleteJob,
} = require("../controllers/jobController");

const { protect, adminOnly } = require("../middlewares/authMiddleware");

router.get("/", protect, adminOnly, getAllJobs);
router.post("/", protect, adminOnly, createJob);
router.delete("/:id", protect, adminOnly, deleteJob);
router.put("/:id/status", protect, updateJobStatus);
router.get("/mine", protect, getElectricianJobs);

module.exports = router;
