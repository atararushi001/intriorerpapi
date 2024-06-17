const PaymentStage = require("../models/payment_stage.model");

const createPaymentStage = async (req, res) => {
    try {
        const { name, price } = req.body;

        const paymentStage = await PaymentStage.create({
            name,
            price,
        });

        res.status(201).json(paymentStage);
    } catch (error) {
        res.status(500).json({
            message: "Error creating payment stage",
            error,
        });
    }
};

const getPaymentStages = async (req, res) => {
    try {
        const paymentStages = await PaymentStage.findAll();
        res.status(200).json(paymentStages);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching payment stages",
            error,
        });
    }
};

const getPaymentStageById = async (req, res) => {
    try {
        const paymentStage = await PaymentStage.findByPk(req.params.id);
        if (!paymentStage) {
            return res.status(404).json({
                message: "Payment stage not found",
            });
        }
        res.status(200).json(paymentStage);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching payment stage",
            error,
        });
    }
};

const updatePaymentStage = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price } = req.body;

        const paymentStage = await PaymentStage.findByPk(id);
        if (!paymentStage) {
            return res.status(404).json({
                message: "Payment stage not found",
            });
        }

        await paymentStage.update({
            name,
            price,
        });

        res.status(200).json(paymentStage);
    } catch (error) {
        res.status(500).json({
            message: "Error updating payment stage",
            error,
        });
    }
};

const deletePaymentStage = async (req, res) => {
    try {
        const { id } = req.params;
        const paymentStage = await PaymentStage.findByPk(id);
        if (!paymentStage) {
            return res.status(404).json({
                message: "Payment stage not found",
            });
        }

        await paymentStage.destroy();
        res.status(200).json({
            message: "Payment stage deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting payment stage",
            error,
        });
    }
};

module.exports = {
    createPaymentStage,
    getPaymentStages,
    getPaymentStageById,
    updatePaymentStage,
    deletePaymentStage,
};
