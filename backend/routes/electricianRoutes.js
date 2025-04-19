const express = require("express");
const router = express.Router();
const {
  getElectricians,
  addElectrician,
  deleteElectrician,
} = require("../controllers/electricianController");

const { protect, adminOnly } = require("../middlewares/authMiddleware");

router.use(protect, adminOnly); // all routes are admin-protected

router.get("/", getElectricians);
router.post("/", addElectrician);
router.delete("/:id", deleteElectrician);

module.exports = router;
