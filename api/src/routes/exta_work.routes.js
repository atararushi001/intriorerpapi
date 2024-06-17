const express = require("express");
const router = express.Router();

// Import the site controller methods
const extraWorkController = require("../controllers/extraWork.controller");
const { extraWorkUpload } = require("../middlewares/multer.middleware");

// Define routes
router.post(
    "/",
    extraWorkUpload.single("image"),
    extraWorkController.createExtraWork,
); // Create a new extraWork
router.put(
    "/:id",
    extraWorkUpload.single("image"),
    extraWorkController.updateExtraWork,
); // Update a extraWork by ID
router.delete("/:id", extraWorkController.deleteExtraWork); // Delete a extraWork by ID
router.get("/", extraWorkController.getExtraWorks); // Get all extraWorks
router.get("/:id", extraWorkController.getExtraWorkById); // Get sites by site_id

module.exports = router;
