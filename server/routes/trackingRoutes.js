const express = require("express");
const {
  getTrackingInfo,
  updateTracking,
} = require("../controllers/trackingController");
const { protect, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/:bookingId", protect, getTrackingInfo);
router.put("/:bookingId", protect, authorize("driver"), updateTracking);

module.exports = router;
