const express = require("express");
const router = express.Router();

router.post("/users", upload.single("profilePhoto"), createUser); // Create a new user
router.get("/users", getUsers); // Get all users
router.get("/users/:id", getUserById); // Get a user by ID
router.put("/users/:id", updateUser); // Update a user by ID
router.delete("/users/:id", deleteUser);

module.exports = router;
