const express = require("express");
const router = express.Router();
const { createPunchIn, getPunchInByProjectAndUser } = require("../controllers/punch_in_user.controller");

const { punch_in_image } = require("../middlewares/multer.middleware");

router.post("/", punch_in_image.single("punchinimage"), createPunchIn);

router.get("/:projectId/:userId", getPunchInByProjectAndUser);

module.exports = router;