const router = require("express").Router();

const geographicEntityController = require("../controllers/geographic_entity.controller");
router.get("/countries", geographicEntityController.getAllCountries);
router.get(
    "/countries/states/:id",
    geographicEntityController.getAllStatesByCountryId,
);
router.get(
    "/countries/state/cities/:id",
    geographicEntityController.getAllCitiesByStateId,
);

module.exports = router;
