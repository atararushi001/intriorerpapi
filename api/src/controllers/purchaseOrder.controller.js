const { Sequelize } = require("sequelize");
const sequelize = require("../config/db.config");
const PurchaseOrder = require("../models/purchaseOrder.model");
const PurchaseOrderDetail = require("../models/purchaseOrderDetail.model");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const Unit = require("../models/unit.model");

const createPurchaseOrder = async (req, res) => {
    try {
        const purchaseOrder = await PurchaseOrder.create(req.body);

        const details = req.body.details;

        if (details && details.length > 0) {
            const purchaseOrderDetails = details.map((detail) => ({
                ...detail,

                purchaseOrderId: purchaseOrder.id,
            }));
            await PurchaseOrderDetail.bulkCreate(purchaseOrderDetails);
        }

        res.status(201).json(purchaseOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPurchaseOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const purchaseOrder = await PurchaseOrder.findByPk(id, {
            include: [
                { model: User, as: "orderedBy" },
                { model: User, as: "deliveredBy" },
                { model: User, as: "dispatchBy" },
                { model: PurchaseOrderDetail, include: [Product] },
            ],
        });

        if (!purchaseOrder) {
            return res.status(404).json({ error: "Purchase Order not found" });
        }

        res.status(200).json(purchaseOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePurchaseOrder = async (req, res) => {
    console.log("body", req.body);
    const { id } = req.params;
    const {
        orderNo,
        status,
        orderedDate,
        approxDeliveryDate,
        projectId,
        orderedById,
        deliveredById,
        dispatchById,
        details,
    } = req.body;

    try {
        const purchaseOrder = await PurchaseOrder.findByPk(id);

        if (!purchaseOrder) {
            return res.status(404).json({ error: "Purchase Order not found" });
        }

        await purchaseOrder.update({
            orderNo,
            status,
            orderedDate,
            approxDeliveryDate,
            projectId,
            orderedById,
            deliveredById,
            dispatchById,
        });

        await PurchaseOrderDetail.destroy({ where: { purchaseOrderId: id } });

        if (details && details.length > 0) {
            const purchaseOrderDetails = details.map((detail) => ({
                ...detail,

                purchaseOrderId: id,
            }));
            await PurchaseOrderDetail.bulkCreate(purchaseOrderDetails);
        }

        res.status(200).json(purchaseOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllPurchaseOrders = async (req, res) => {
    try {
        const purchaseOrders = await PurchaseOrder.findAll({
            include: [
                { model: User, as: "orderedBy" },
                { model: User, as: "deliveredBy" },
                { model: User, as: "dispatchBy" },
                {
                    model: PurchaseOrderDetail,
                    include: [{ model: Product, include: { model: Unit } }],
                },
            ],
        });
        res.status(200).json({
            data: purchaseOrders,
            message: "Purchase Order fetched",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPurchaseOrdersByProjectId = async (req, res) => {
    const { ProjectId } = req.params;

    try {
        const purchaseOrders = await PurchaseOrder.findAll({
            where: { ProjectId },
            include: [
                { model: User, as: "orderedBy" },
                { model: User, as: "deliveredBy" },
                { model: User, as: "dispatchBy" },
                { model: PurchaseOrderDetail, include: [Product] },
            ],
        });
        res.status(200).json(purchaseOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePurchaseOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const purchaseOrder = await PurchaseOrder.findByPk(id);

        if (!purchaseOrder) {
            return res.status(404).json({ error: "Purchase Order not found" });
        }

        await PurchaseOrderDetail.destroy({ where: { purchaseOrderId: id } });
        await purchaseOrder.destroy();

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPurchaseOrder,
    getPurchaseOrderById,
    updatePurchaseOrder,
    deletePurchaseOrder,
    getPurchaseOrdersByProjectId,
    getAllPurchaseOrders,
};
