const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

router.use(protect);

router.get("/profile", userController.getUserProfile);
router.put("/profile", userController.updateUserProfile);
router.put("/change-password", userController.changePassword);

module.exports = router;
