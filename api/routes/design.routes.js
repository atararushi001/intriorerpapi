const router = require("express").Router();
const { designUpload } = require("../middleware/multer.middleware");
const { storeDesign } = require("../controllers/design.controller");

router.post("/", designUpload.single("design"), storeDesign);

module.exports = router;
