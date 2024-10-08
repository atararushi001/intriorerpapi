const router = require("express").Router();
const { storeDesign } = require("../controllers/design.controller");
const { designUpload } = require("../middlewares/multer.middleware");
const designController = require("../controllers/design.controller");
router.post("/", designUpload.single("design"), storeDesign);
router.put("/clientfeedback/:id", designController.updateDesignApprovalAndFeedback);
router.delete("/deletedesign/:id", designController.deleteDesign);
router.get("/:id", designController.getDesignById);

module.exports = router;
