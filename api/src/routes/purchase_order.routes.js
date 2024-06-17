const express = require("express");
const router = express.Router();

const purchaseOrderController = require("../controllers/purchaseOrder.controller");

router.post("/", purchaseOrderController.createPurchaseOrder);
router.put("/:id", purchaseOrderController.updatePurchaseOrder);
router.delete("/:id", purchaseOrderController.deletePurchaseOrder);
router.get("/", purchaseOrderController.getAllPurchaseOrders);
router.get(
    "/project/:ProjectId",
    purchaseOrderController.getPurchaseOrdersByProjectId,
);
router.get("/:id", purchaseOrderController.getPurchaseOrderById);

module.exports = router;
