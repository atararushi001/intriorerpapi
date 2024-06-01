const express = require("express");
const router = express.Router();

// Import the site controller methods
const siteController = require("../controllers/SiteController");

// Define routes
router.post("/", siteController.createSite); // Create a new site
router.put("/:id", siteController.editSite); // Update a site by ID
router.delete("/:id", siteController.deleteSite); // Delete a site by ID
router.get("/", siteController.getAllSites); // Get all sites
router.get("/:site_id", siteController.getSitesbyid); // Get sites by site_id

module.exports = router;
