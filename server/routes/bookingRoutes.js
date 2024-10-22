const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { protect } = require("../middlewares/authMiddleware");

router.use(protect);

router.post("/", bookingController.createBooking);
router.get("/:id", bookingController.getBookingById);
router.put("/:id/status", bookingController.updateBookingStatus);
router.put("/:bookingId/cancel", bookingController.cancelBooking);
router.get("/user/:userId", bookingController.getUserBookings);

module.exports = router;
