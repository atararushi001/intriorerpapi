const  Order  = require('../models/order.model');

const OrderProduct = require('../models/orderproduct.model');
const createOrder = async (req, res) => {
    const { products, invoiceNumber, orderBy } = req.body;

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
            // deliveredBy,
            // dispatchBy,
        });

        for (const product of products) {
            const { productId, quantity } = product;
            if (!productId || !quantity) {
                return res.status(400).json({ message: "Product ID and quantity are required" });
            }

            await OrderProduct.create({
                orderId: createdOrder.id,
                productId,
                quantity,
            });
        }

        const fullOrder = await Order.findByPk(createdOrder.id, {
            include: [
               
                
            ],
        });

        res.status(201).json(fullOrder);
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
};

module.exports = {
    createOrder,
};