const express = require("express");
const router = express.Router();

const reportingController = require("../controllers/reporting.controller");


// user wise data 

router.get("/admindashboard", reportingController.admindashboard);
router.get("/supervisordashboard/:id", reportingController.supervisordashboard);
router.get("/clientdashboard/:id", reportingController.clientdashboard);
router.get("/headcarpenterdashboard/:id", reportingController.headcarpenterdashboard);
router.get("/factoryworkerdashboard/:id", reportingController.factoryworkerdashboard);
router.get("/deliveryboydashboard/:id", reportingController.deliveryboydashboard);
router.get("/designerdashboard/:id", reportingController.designerdashboard  );

module.exports = router;
