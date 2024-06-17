const express = require("express");
const router = express.Router();

const unitController = require("../controllers/unit.controller");

router.post("/", unitController.createUnit);
router.put("/:id", unitController.updateUnit);
router.delete("/:id", unitController.deleteUnit);
router.get("/", unitController.getUnits);
router.get("/:id", unitController.getUnitById);

module.exports = router;
