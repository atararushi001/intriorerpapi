const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { profilePictureUpload } = require("../middleware/multer.middleware");

router.post(
	"/register",
	profilePictureUpload.single("profilePhoto"),
	userController.registerUser
);
router.get("/getalluser", userController.getAllUsers);

module.exports = router;
