const express = require("express");
const router = express.Router();

const userroute = require("./user_route");
const site_route = require("./site_route");
const utils_route = require("./utils_route");

router.use("/user", userroute);
router.use("/site", site_route);
router.use("/utils", utils_route);

router.use("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API" });
});

module.exports = router;
