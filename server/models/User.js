const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["customer", "driver", "admin"],
      default: "customer",
    },
    phone: { type: String },
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    driverInfo: {
      type: {
        type: String, 
        required: false, 
      },
      licensePlate: {
        type: String, 
        required: false,
      },
      capacity: {
        type: Number, 
        required: false,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
