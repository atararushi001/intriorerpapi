const express = require("express");
const router = express.Router();

const reportingController = require("../controllers/reporting.controller");

// Project-related routes
router.get("/totalprojctcount", reportingController.totalprojctcount);
router.get("/totalprojctbyclientid/:id", reportingController.totalprojctbyclientid);
router.get("/totalprojctbycompetebyclientid/:id", reportingController.totalprojctbycompetebyclientid);
router.get("/totalprojctbyhead_carpenter_id/:id", reportingController.totalprojctbyhead_carpenter_id);
router.get("/totalprojctcompletebyhead_carpenter_id/:id", reportingController.totalprojctcompletebyhead_carpenter_id);
router.get("/totalprojctbysupervisor_id/:id", reportingController.totalprojctbysupervisor_id);
router.get("/totalprojctbydesigner_id/:id", reportingController.totalprojctbydesigner_id);
router.get("/totalprojctcompletebydesigner_id/:id", reportingController.totalprojctcompletebydesigner_id);
router.get("/totalprojctpandingbydesigner_id/:id", reportingController.totalprojctpandingbydesigner_id);

// Order-related routes
router.get("/totalorder", reportingController.totalorder);
router.get("/totalorderhead_carpenter_id/:id", reportingController.totalorderhead_carpenter_id);
router.get("/totalordercountdelivereryboybyid/:id", reportingController.totalordercountdelivereryboybyid);
router.get("/totalorderpandngdelivereryboybyid/:id", reportingController.totalorderpandngdelivereryboybyid);
router.get("/totalorderdelivered", reportingController.totalorderdelivered);
router.get("/totalorderPending", reportingController.totalorderPending);

// Product-related routes
router.get("/totalproduct", reportingController.totalproduct);

// User-related routes
router.get("/totaldesignercoount", reportingController.totaldesignercoount);
router.get("/totalheadcarpentercount", reportingController.totalheadcarpentercount);
router.get("/totalclientcount", reportingController.totalclientcount);

module.exports = router;
