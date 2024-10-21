const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { protect, authorize } = require("../middlewares/authMiddleware");

router.use(protect, authorize("admin"));

router.get("/users", adminController.getAllUsers);
router.get("/bookings", adminController.getAllBookings);
router.get("/stats/users", adminController.getUserStats);
router.get("/stats/bookings", adminController.getBookingStats);

module.exports = router;
