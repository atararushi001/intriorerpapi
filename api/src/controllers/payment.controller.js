const Payment = require("../models/payment.model");
const Project = require("../models/project.model");
const User = require("../models/usermodel");

// Create a new payment
const createPayment = async (req, res) => {
    try {
        const {
            project_id,
            client_id,
            amount,
            payment_date,
            payment_method,
            status,
        } = req.body;

        // Check if the related project and client exist
        const project = await Project.findByPk(project_id);
        if (!project) {
            return res.status(400).json({ message: "Project not found" });
        }
        const client = await User.findByPk(client_id);
        if (!client) {
            return res.status(400).json({ message: "Client not found" });
        }

        // Create the payment
        const payment = await Payment.create({
            project_id,
            client_id,
            amount,
            payment_date,
            payment_method,
            status,
        });

        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json({ message: "Error creating payment", error });
    }
};

// Get all payments
const getPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll({
            include: [{ model: Project }, { model: User, as: "Client" }],
        });
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching payments", error });
    }
};

// Get a payment by ID
const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id, {
            include: [{ model: Project }, { model: User, as: "Client" }],
        });
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: "Error fetching payment", error });
    }
};

// Update a payment
const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            project_id,
            client_id,
            amount,
            payment_date,
            payment_method,
            status,
        } = req.body;

        const payment = await Payment.findByPk(id);
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        // Check if the related project and client exist
        if (project_id) {
            const project = await Project.findByPk(project_id);
            if (!project) {
                return res.status(400).json({ message: "Project not found" });
            }
        }
        if (client_id) {
            const client = await User.findByPk(client_id);
            if (!client) {
                return res.status(400).json({ message: "Client not found" });
            }
        }

        // Update the payment
        await payment.update({
            project_id,
            client_id,
            amount,
            payment_date,
            payment_method,
            status,
        });

        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: "Error updating payment", error });
    }
};

// Delete a payment
const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findByPk(id);
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        await payment.destroy();
        res.status(200).json({ message: "Payment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting payment", error });
    }
};

module.exports = {
    createPayment,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
};
