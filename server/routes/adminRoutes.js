const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { protect, authorize } = require("../middlewares/authMiddleware");

router.use(protect, authorize("admin"));

router.get("/dashboard", adminController.getDashboardData);
router.get("/user-stats", adminController.getUserStats);
router.get("/booking-stats", adminController.getBookingStats);

module.exports = router;
