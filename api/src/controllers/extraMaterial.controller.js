const Order = require("../models/order.model");
const OrderProduct = require("../models/orderproduct.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const Project = require("../models/project.model");

// Create a new order
const createOrder = async (req, res) => {
    const { products, invoiceNumber, orderBy, project } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "Products array is required" });
    }

    if (!invoiceNumber) {
        return res.status(400).json({ message: "Invoice number is required" });
    }

    try {
        const createdOrder = await Order.create({
            invoiceNumber,
            orderBy,
            project,
        });

        for (const product of products) {
            const { productId, quantity } = product;
            if (!productId || !quantity) {
                return res
                    .status(400)
                    .json({ message: "Product ID and quantity are required" });
            }

            await OrderProduct.create({
                orderId: createdOrder.id,
                productId,
                quantity,
            });
        }

        const fullOrder = await Order.findByPk(createdOrder.id, {
            include: [
                { model: OrderProduct
                    ,
                    include: [
                        {
                            model: Product,
                            as: "productId",
                        },
                    ],
                 },
                { model: User, as: "orderByid" },
                { model: Project, as: "projectid" },
            ],
        });

        res.status(201).json(fullOrder);
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
};

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                { model: OrderProduct ,
                    include: [
                        {
                            model: Product,
                            as: "productId",
                        },
                    ],
                },

                { model: User, as: "orderByid" },
                { model: Project, as: "projectid" },
            ],
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};
const getOrdersByCreatedById = async (req, res) => {
    const { id } = req.params;
    try {
        const orders = await Order.findAll({
            where: { orderBy: id },
            include: [
                { model: OrderProduct ,
                    include: [
                        {
                            model: Product,
                            as: "productId",
                        },
                    ],
                },
                { model: User, as: "orderByid" },
                { model: Project, as: "projectid" },
            ],
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};

// Update an order
const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { products, invoiceNumber, orderBy, project } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "Products array is required" });
    }

    if (!invoiceNumber) {
        return res.status(400).json({ message: "Invoice number is required" });
    }

    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        await order.update({
            invoiceNumber,
            orderBy,
            project,
        });

        await OrderProduct.destroy({ where: { orderId: id } });

        for (const product of products) {
            const { productId, quantity } = product;
            if (!productId || !quantity) {
                return res
                    .status(400)
                    .json({ message: "Product ID and quantity are required" });
            }

            await OrderProduct.create({
                orderId: id,
                productId,
                quantity,
            });
        }

        const fullOrder = await Order.findByPk(id, {
            include: [
                {
                    model: OrderProduct
                    ,
                    include: [
                        {
                            model: Product,
                            as: "productId",
                        },
                    ],
                },
                { model: User, as: "orderByid" },
                { model: Project, as: "projectid" },
            ],
        });

        res.status(200).json(fullOrder);
    } catch (error) {
        res.status(500).json({ message: "Error updating order", error });
    }
};
const conformorder = async (req, res) => {
    const {
        products,
        invoiceNumber,
        orderBy,
        project,
        orderid,
        deliveredBy,
        dispatchBy,
    } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "Products array is required" });
    }

    if (!invoiceNumber) {
        return res.status(400).json({ message: "Invoice number is required" });
    }

    try {
        const order = await Order.findByPk(orderid);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const user = await User.findByPk(orderBy);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const projectRecord = await Project.findByPk(project);
        if (!projectRecord) {
            return res.status(400).json({ message: "Project not found" });
        }

        await order.update({
            invoiceNumber,
            orderBy,
            project,
            deliveredBy,
            dispatchBy,
        });

        await OrderProduct.destroy({ where: { orderId: orderid } });

        for (const product of products) {
            const { productId, quantity } = product;
            if (!productId || !quantity) {
                return res
                    .status(400)
                    .json({ message: "Product ID and quantity are required" });
            }

            await OrderProduct.create({
                orderId: orderid,
                productId,
                quantity,
            });

            const productRecord = await Product.findByPk(productId);
            if (productRecord) {
                await productRecord.update({
                    stock: productRecord.stock - quantity,
                });
            }
        }

        const fullOrder = await Order.findByPk(createdOrder.id, {
            include: [
                { model: OrderProduct  ,
                    include: [
                        {
                            model: Product,
                            as: "productId",
                        },
                    ],
                },
                { model: User, as: "orderByid" },
                { model: Project, as: "projectid" },
            ],
        });

        res.status(200).json(fullOrder);
    } catch (error) {
        res.status(500).json({ message: "Error updating order", error });
    }
};
module.exports = {
    createOrder,
    getAllOrders,
    getOrdersByCreatedById,
    updateOrder,
    conformorder,
};
