const express = require("express");
const router = express.Router();
const {
  addMaterialUsage,
  getMaterialsByElectrician,
  getAllMaterialUsages,
} = require("../controllers/materialController");

const { protect, adminOnly } = require("../middlewares/authMiddleware");

router.post("/", protect, addMaterialUsage);
router.get("/mine", protect, getMaterialsByElectrician);
router.get("/", protect, adminOnly, getAllMaterialUsages);

module.exports = router;
