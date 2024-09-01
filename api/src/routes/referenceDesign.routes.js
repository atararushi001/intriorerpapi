const router = require("express").Router();

const { referenceDesignUpload } = require("../middlewares/multer.middleware");
const designController = require("../controllers/referenceDesign.controller");
router.post("/create", referenceDesignUpload.single("referencedesign"), designController.storeDesign);
router.put('/update/:id', referenceDesignUpload.single("referencedesign"),designController.updateDesign);
router.get('/:id', designController.getDesignById);
router.get('/byprojectid/:projectId', designController.getDesignsByProjectId);

module.exports = router;
