const User = require("../models/User");
const Booking = require("../models/Booking");

exports.getDashboardData = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const start = startDate
      ? new Date(startDate)
      : new Date(new Date().setDate(new Date().getDate() - 30));
    const end = endDate ? new Date(endDate) : new Date();

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    const [userCount, driverCount] = await Promise.all([
      User.countDocuments({ role: "customer" }),
      User.countDocuments({ role: "driver" }),
    ]);

    const bookings = await Booking.find({
      createdAt: { $gte: start, $lte: end },
    })
      .populate("user", "name email")
      .populate("driver", "name email driverInfo");

    const bookingCount = bookings.length;

    const totalRevenue = bookings.reduce(
      (sum, booking) => sum + (booking.price || 0),
      0
    );

    const revenueAnalytics = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
          status: "completed",
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalRevenue: { $sum: "$price" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const [users, drivers] = await Promise.all([
      User.find({ role: "customer" }).select("-password"),
      User.find({ role: "driver" }).select("-password"),
    ]);

    res.json({
      userCount,
      driverCount,
      bookingCount,
      totalRevenue,
      revenueAnalytics,
      bookings,
      users,
      drivers,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    res
      .status(500)
      .json({ message: "Error fetching dashboard data", error: error.message });
  }
};

exports.getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const customerCount = await User.countDocuments({ role: "customer" });
    const driverCount = await User.countDocuments({ role: "driver" });

    res.json({ totalUsers, customerCount, driverCount });
  } catch (error) {
    console.error("User stats error:", error);
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
    const pendingBookings = await Booking.countDocuments({ status: "pending" });
    const cancelledBookings = await Booking.countDocuments({
      status: "cancelled",
    });

    res.json({
      totalBookings,
      completedBookings,
      activeBookings,
      pendingBookings,
      cancelledBookings,
    });
  } catch (error) {
    console.error("Booking stats error:", error);
    res
      .status(500)
      .json({ message: "Error fetching booking stats", error: error.message });
  }
};
