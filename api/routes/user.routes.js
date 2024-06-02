const express = require("express");
const { profilePictureUpload } = require("../middleware/multer.middleware");
const router = express.Router();
const userController = require("../controllers/userController");

router.post(
  "/",
  profilePictureUpload.single("profilePhoto"),
  userController.createUser
); // Create a new user
router.get("/", userController.getUsers); // Get all users
router.get("/:id", userController.getUserById); // Get a user by ID
router.put("/:id", userController.updateUser); // Update a user by ID
router.delete("/:id", userController.deleteUser);

module.exports = router;
