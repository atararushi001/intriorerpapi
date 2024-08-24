const express = require("express");
const router = express.Router();

const { createOrder,getAllOrders,updateOrder,getOrdersByCreatedById,conformorder } = require("../controllers/order.controller");
router.post('/create', createOrder);
router.post('/conformorder', conformorder);
router.get('/getall', getAllOrders);
router.put("/update/:id", updateOrder); // New route for updating an order

router.get('/byCreatedBy/:id', getOrdersByCreatedById);
module.exports = router;
