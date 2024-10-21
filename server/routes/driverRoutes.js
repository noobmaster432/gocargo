const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driverController");
const { protect, authorize } = require("../middlewares/authMiddleware");

router.use(protect, authorize("driver"));

router.put("/location", driverController.updateLocation);
router.get("/bookings/available", driverController.getAvailableBookings);
router.put("/bookings/:id/accept", driverController.acceptBooking);
router.get("/bookings", driverController.getDriverBookings);

module.exports = router;
