const Design = require("../models/design.model");
const DesignApproval = require("../models/designApprove.model");
const User = require("../models/usermodel");

// Create a new design approval
const createDesignApproval = async (req, res) => {
    try {
        const { design_id, client_id, status, feedback } = req.body;

        // Check if the related design and client exist
        const design = await Design.findByPk(design_id);
        if (!design) {
            return res.status(400).json({ message: "Design not found" });
        }
        const client = await User.findByPk(client_id);
        if (!client) {
            return res.status(400).json({ message: "Client not found" });
        }

        // Create the design approval
        const designApproval = await DesignApproval.create({
            design_id,
            client_id,
            status,
            feedback,
        });

        res.status(201).json(designApproval);
    } catch (error) {
        res.status(500).json({
            message: "Error creating design approval",
            error,
        });
    }
};

// Get all design approvals
const getDesignApprovals = async (req, res) => {
    try {
        const designApprovals = await DesignApproval.findAll({
            include: [{ model: Design }, { model: User, as: "Client" }],
        });
        res.status(200).json(designApprovals);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching design approvals",
            error,
        });
    }
};

// Get a design approval by ID
const getDesignApprovalById = async (req, res) => {
    try {
        const designApproval = await DesignApproval.findByPk(req.params.id, {
            include: [{ model: Design }, { model: User, as: "Client" }],
        });
        if (!designApproval) {
            return res
                .status(404)
                .json({ message: "Design approval not found" });
        }
        res.status(200).json(designApproval);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching design approval",
            error,
        });
    }
};

// Update a design approval
const updateDesignApproval = async (req, res) => {
    try {
        const { id } = req.params;
        const { design_id, client_id, status, feedback } = req.body;

        const designApproval = await DesignApproval.findByPk(id);
        if (!designApproval) {
            return res
                .status(404)
                .json({ message: "Design approval not found" });
        }

        // Check if the related design and client exist
        if (design_id) {
            const design = await Design.findByPk(design_id);
            if (!design) {
                return res.status(400).json({ message: "Design not found" });
            }
        }
        if (client_id) {
            const client = await User.findByPk(client_id);
            if (!client) {
                return res.status(400).json({ message: "Client not found" });
            }
        }

        // Update the design approval
        await designApproval.update({
            design_id,
            client_id,
            status,
            feedback,
        });

        res.status(200).json(designApproval);
    } catch (error) {
        res.status(500).json({
            message: "Error updating design approval",
            error,
        });
    }
};

// Delete a design approval
const deleteDesignApproval = async (req, res) => {
    try {
        const { id } = req.params;
        const designApproval = await DesignApproval.findByPk(id);
        if (!designApproval) {
            return res
                .status(404)
                .json({ message: "Design approval not found" });
        }

        await designApproval.destroy();
        res.status(200).json({
            message: "Design approval deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting design approval",
            error,
        });
    }
};

module.exports = {
    createDesignApproval,
    getDesignApprovals,
    getDesignApprovalById,
    updateDesignApproval,
    deleteDesignApproval,
};
