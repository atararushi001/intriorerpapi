const express = require("express");
const router = express.Router();

const { createOrder,getAllOrders } = require("../controllers/order.controller");
router.post('/create', createOrder);
router.get('/getall', getAllOrders);
module.exports = router;
