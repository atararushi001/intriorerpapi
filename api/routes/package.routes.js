const express = require("express");
const router = express.Router();

const packageController = require("../controllers/package.controller");
router.post("/", packageController.createPackage); // Create a new project

router.get("/", packageController.getPackages); // Get all users
router.get("/:id", packageController.getPackageById); // Get a user by ID
router.put("/:id", packageController.updatePackage); // Update a user by ID
router.delete("/:id", packageController.deletePackage);

module.exports = router;
