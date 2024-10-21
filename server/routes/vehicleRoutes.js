const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController");
const { protect, authorize } = require("../middlewares/authMiddleware");

router.use(protect, authorize("driver"));

router.post("/", vehicleController.addVehicle);
router.get("/", vehicleController.getDriverVehicles);
router.put("/:id", vehicleController.updateVehicle);

module.exports = router;
