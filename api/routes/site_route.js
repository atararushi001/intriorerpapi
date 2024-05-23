const express = require("express");
const router = express.Router();

const SiteController = require("../controllers/SiteController");

router.post("/add",SiteController.createSite);
router.post("/getall",SiteController.getAllSites);
router.post("/delete",SiteController.deleteSite);
router.post("/getbyid",SiteController.getSitesbyid);


module.exports = router;