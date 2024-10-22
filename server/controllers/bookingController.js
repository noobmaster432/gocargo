const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    const { pickupLocation, dropoffLocation, vehicleType, userId, price } = req.body;
    const booking = await Booking.create({
      user: userId,
      pickupLocation,
      dropoffLocation,
      vehicleType,
      status: "pending",
      price
    });
    res.status(201).json(booking);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating booking", error: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "user driver",
      "name email"
    );
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching booking", error: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating booking status", error: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId }).populate(
      "driver",
      "name email"
    );
    res.json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user bookings", error: error.message });
  }
};
