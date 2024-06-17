const router = require("express").Router();

const paymentStageController = require("../controllers/payment_stage.controller");

router.post("/", paymentStageController.createPaymentStage);
router.get("/", paymentStageController.getPaymentStages);
router.get("/:id", paymentStageController.getPaymentStageById);
router.put("/:id", paymentStageController.updatePaymentStage);
router.delete("/:id", paymentStageController.deletePaymentStage);

module.exports = router;
