const express = require("express");
const router = express.Router();

const { createextraMaterial,getExtraMaterialByProjectId } = require("../controllers/extraMaterial.controller");
router.post('/create', createextraMaterial);
router.get("/getbyprojectid/:projectId", getExtraMaterialByProjectId);

module.exports = router;
