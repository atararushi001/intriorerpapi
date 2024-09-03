const express = require("express");
const router = express.Router();

const { createextraMaterial,getExtraMaterialByProjectId, updateExtraMaterial } = require("../controllers/extraMaterial.controller");
router.post('/create', createextraMaterial);
router.get("/getbyprojectid/:projectId", getExtraMaterialByProjectId);
router.put('/update/:id', updateExtraMaterial);

module.exports = router;
