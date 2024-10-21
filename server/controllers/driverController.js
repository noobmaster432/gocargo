const User = require("../models/User");
const Booking = require("../models/Booking");

exports.updateLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const driver = await User.findByIdAndUpdate(
      req.user.id,
      { location: { latitude, longitude } },
      { new: true }
    );
    res.json({
      message: "Location updated successfully",
      location: driver.location,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating location", error: error.message });
  }
};

exports.getAvailableBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ status: "pending" }).populate(
      "user",
      "name"
    );
    res.json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching available bookings",
        error: error.message,
      });
  }
};

exports.acceptBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "accepted", driver: req.user.id },
      { new: true }
    ).populate("user", "name");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error accepting booking", error: error.message });
  }
};

exports.getDriverBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ driver: req.user.id }).populate(
      "user",
      "name"
    );
    res.json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching driver bookings",
        error: error.message,
      });
  }
};
