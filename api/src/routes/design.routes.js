const router = require("express").Router();
const { storeDesign } = require("../controllers/design.controller");
const { designUpload } = require("../middlewares/multer.middleware");

router.post("/", designUpload.single("design"), storeDesign);

module.exports = router;
