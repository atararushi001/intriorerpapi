const express = require("express");
const router = express.Router();

const extraMaterialController = require('../controllers/extraMaterial.controller');

// Route to create a new extraMaterial
router.post('/create', extraMaterialController.createextraMaterial);

// Route to get extraMaterial data by project ID
router.get('/project/:projectId', extraMaterialController.getExtraMaterialByProjectId);

// Route to update an extraMaterial
router.put('/update/:id', extraMaterialController.updateExtraMaterial);

module.exports = router;
