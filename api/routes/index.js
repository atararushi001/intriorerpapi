const express = require("express");
const router = express.Router();

const userroute = require("./user.routes");
const siteRouter = require("./site.routes");
const utils_route = require("./utils_route");
const projectRouter = require("./project.routes");
const extraWork = require("./extraWork.routes");

router.use("/user", userroute);
router.use("/site", siteRouter);
router.use("/utils", utils_route);
router.use("/project", projectRouter);
router.use("/extraWork", extraWork);

// router.use("/", (req, res) => {
//   res.status(200).json({ message: "Welcome to the API" });
// });

module.exports = router;
