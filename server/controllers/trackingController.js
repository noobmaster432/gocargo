const Booking = require("../models/Booking");

exports.getTrackingInfo = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const tracking = await Booking.findById(bookingId);

    if (!tracking) {
      return res
        .status(404)
        .json({ success: false, message: "Tracking information not found" });
    }

    res.status(200).json({ success: true, data: tracking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateTracking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status, latitude, longitude } = req.body;

    const tracking = await Booking.findById(bookingId);
    if (!tracking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    tracking.status = status || tracking.status;
    tracking.currentLocation = {
      type: "Point",
      coordinates: [longitude, latitude],
    };
    tracking.updatedAt = Date.now();

    await tracking.save();

    res.status(200).json({ success: true, data: tracking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
