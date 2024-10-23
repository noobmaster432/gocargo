const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController");
const { protect, authorize } = require("../middlewares/authMiddleware");

router.use(protect, authorize("driver"));

router.post("/", vehicleController.addVehicle);
router.get("/", vehicleController.getDriverVehicles);
router.put("/:id", vehicleController.updateVehicle);
router.delete("/:id", vehicleController.deleteVehicle);

module.exports = router;
