const express = require("express");
const router = express.Router();

// Import the project controller methods
const projectController = require("../controllers/project.controller");

// Define routes
router.post("/", projectController.createProject); // Create a new project
router.put("/:id", projectController.updateProject); // Update a project by ID
router.delete("/:id", projectController.deleteProject); // Delete a project by ID
router.get("/", projectController.getProjects); // Get all projects
router.get("/:id", projectController.getProjectById); // Get a project by ID
router.post("/assign_designer", projectController.assignDesigner); // Get a project by ID
router.post("/assignHeadCarpenter", projectController.assignHeadCarpenter); // Get a project by ID

module.exports = router;
