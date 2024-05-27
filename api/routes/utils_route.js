const express = require("express");
const router = express.Router();

const utilsController = require("../controllers/utilsController");
router.get("/getCountries",utilsController.getAllCountries);
router.get("/getStatesByCountryId/:id",utilsController.getAllStatesByCountryId);
router.get("/getCitiesByStateId/:id",utilsController.getAllCitiesByStateId);

module.exports = router;