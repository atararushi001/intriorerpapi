// const Order = require("../models/order.model");
// const Product = require("../models/product.model");
// const User = require("../models/user.model");

// // Create a new order
// const createOrder = async (req, res) => {
//     try {
//         // Create the order
//         const order = await Order.create(req.body);

//         const createdOrder = await Order.findByPk(order.dataValues.id, {
//             include: [
//                 { model: Product },
//                 { model: User, as: "orderBy" },
//                 { model: User, as: "deliveredBy" },
//                 { model: User, as: "dispatchBy" },
//             ],
//         });
//         res.status(201).json(createdOrder);
//     } catch (error) {
//         res.status(500).json({ message: "Error creating order", error });
//     }
// };

// // Get all orders
// const getOrders = async (req, res) => {
//     try {
//         const orders = await Order.findAll({
//             include: [
//                 { model: Product },
//                 { model: User, as: "orderBy" },
//                 { model: User, as: "deliveredBy" },
//                 { model: User, as: "dispatchBy" },
//             ],
//         });
//         res.status(200).json(orders);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching orders", error });
//     }
// };

// // Get an order by ID
// const getOrderById = async (req, res) => {
//     try {
//         const order = await Order.findByPk(req.params.id, {
//             include: [
//                 { model: Product },
//                 { model: User, as: "orderBy" },
//                 { model: User, as: "deliveredBy" },
//                 { model: User, as: "dispatchBy" },
//             ],
//         });
//         if (!order) {
//             return res.status(404).json({ message: "Order not found" });
//         }
//         res.status(200).json(order);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching order", error });
//     }
// };

// // Update an order
// const updateOrder = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const order = await Order.findByPk(id);
//         if (!order) {
//             return res.status(404).json({ message: "Order not found" });
//         }

//         // Update the order
//         await order.update(req.body);

//         const updatedOrder = await Order.findByPk(order.dataValues.id, {
//             include: [
//                 { model: Product },
//                 { model: User, as: "orderBy" },
//                 { model: User, as: "deliveredBy" },
//                 { model: User, as: "dispatchBy" },
//             ],
//         });

//         res.status(200).json(updatedOrder);
//     } catch (error) {
//         res.status(500).json({ message: "Error updating order", error });
//     }
// };

// // Delete an order
// const deleteOrder = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const order = await Order.findByPk(id);
//         if (!order) {
//             return res.status(404).json({ message: "Order not found" });
//         }

//         await order.destroy();
//         res.status(200).json({ message: "Order deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting order", error });
//     }
// };

// module.exports = {
//     createOrder,
//     getOrders,
//     getOrderById,
//     updateOrder,
//     deleteOrder,
// };
