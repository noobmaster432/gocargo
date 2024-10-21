const User = require("../models/User");
const Booking = require("../models/Booking");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user driver", "name email");
    res.json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching bookings", error: error.message });
  }
};

exports.getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const customerCount = await User.countDocuments({ role: "customer" });
    const driverCount = await User.countDocuments({ role: "driver" });
    res.json({ totalUsers, customerCount, driverCount });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user stats", error: error.message });
  }
};

exports.getBookingStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const completedBookings = await Booking.countDocuments({
      status: "completed",
    });
    const activeBookings = await Booking.countDocuments({
      status: "in_progress",
    });
    res.json({ totalBookings, completedBookings, activeBookings });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching booking stats", error: error.message });
  }
};
