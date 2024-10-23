const Vehicle = require("../models/Vehicle");

exports.addVehicle = async (req, res) => {
  try {
    const { type, licensePlate, capacity } = req.body;
    const vehicle = await Vehicle.create({
      type,
      licensePlate,
      capacity,
      driver: req.user.id,
    });
    res.status(201).json(vehicle);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error adding vehicle", error: error.message });
  }
};

exports.getDriverVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ driver: req.user.id });
    res.json(vehicles);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching driver vehicles",
        error: error.message,
      });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const { type, licensePlate, capacity } = req.body;
    const vehicle = await Vehicle.findOneAndUpdate(
      { _id: req.params.id, driver: req.user.id },
      { type, licensePlate, capacity },
      { new: true }
    );
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.json(vehicle);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating vehicle", error: error.message });
  }
};
