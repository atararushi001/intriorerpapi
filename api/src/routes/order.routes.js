const express = require("express");
const router = express.Router();
const { orderddeliveredupload } = require("../middlewares/multer.middleware");

const { createOrder,getAllOrders,updateOrder,getOrdersByCreatedById,conformorder,delivered,getOrdersBydeliveryById } = require("../controllers/order.controller");
router.post('/create', createOrder);
router.post('/conformorder', conformorder);
router.get('/getall', getAllOrders);
router.put("/update/:id", updateOrder); // New route for updating an order

router.get('/byCreatedBy/:id', getOrdersByCreatedById);
router.get('/byDeliveryBy/:id', getOrdersBydeliveryById);
router.put("/delivered/:id" , orderddeliveredupload.single("deliveryphoto"), delivered);
module.exports = router;
