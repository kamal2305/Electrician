const express = require("express");
const router = express.Router();
const { generateInvoice, getInvoices } = require("../controllers/invoiceController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

router.post("/", protect, adminOnly, generateInvoice);
router.get("/", protect, adminOnly, getInvoices);

module.exports = router;
