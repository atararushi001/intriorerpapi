const express = require("express");
const router = express.Router();

const utilsController = require("../controllers/utilsController");
router.get("/getCountries",utilsController.getAllCountries);

module.exports = router;