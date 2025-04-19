const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Route imports
const authRoutes = require("./routes/authRoutes");
const electricianRoutes = require("./routes/electricianRoutes");
const jobRoutes = require("./routes/jobRoutes");
const timeLogRoutes = require("./routes/timeLogRoutes");
const materialRoutes = require("./routes/materialRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const reportRoutes = require("./routes/reportRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

dotenv.config(); // Load environment variables
connectDB();     // Connect to MongoDB

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);                // Authentication
app.use("/api/electricians", electricianRoutes); // Electrician management
app.use("/api/jobs", jobRoutes);                 // Job assignments
app.use("/api/timelogs", timeLogRoutes);         // Time tracking
app.use("/api/materials", materialRoutes);       // Material management
app.use("/api/invoices", invoiceRoutes);         // Invoice & Billing
app.use("/api/reports", reportRoutes);           // Reporting & Analytics
app.use("/api/notifications", notificationRoutes); // Notifications

// Base Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
