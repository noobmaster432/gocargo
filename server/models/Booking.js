const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    pickupLocation: { type: String, required: true },
    dropoffLocation: { type: String, required: true },
    vehicleType: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "in_progress", "completed", "cancelled"],
      default: "pending",
    },
    price: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
