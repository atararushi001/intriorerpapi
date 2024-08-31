const Order = require("../models/order.model");
const OrderProduct = require("../models/orderproduct.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const Project = require("../models/project.model");
const extraMaterial = require("../models/extraMaterial.model");
const extraMaterialProduct = require("../models/extraMaterialproduct.model");

// Create a new extraMaterial
const createextraMaterial = async (req, res) => {
    const { products, invoiceNumber, extraMaterialby, project } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "Products array is required" });
    }

    if (!invoiceNumber) {
        return res.status(400).json({ message: "Invoice number is required" });
    }

    try {
        // Check if the project exists
        const projectExists = await Project.findByPk(project);
        if (!projectExists) {
            return res.status(400).json({ message: "Project does not exist" });
        }

        const createextraMaterial = await extraMaterial.create({
            invoiceNumber,
            extraMaterialby,
            project,
        });

        for (const product of products) {
            const { productId, quantity } = product;
            if (!productId || !quantity) {
                return res.status(400).json({ message: "Product ID and quantity are required" });
            }

            await extraMaterialProduct.create({
                extraMaterialId: createextraMaterial.id,
                productId,
                quantity,
            });
        }

        const fullOrder = await extraMaterial.findByPk(createextraMaterial.id, {
            include: [
                {
                    model: extraMaterialProduct,
                    include: [
                        {
                            model: Product,
                            as: "product",
                        },
                    ],
                },
                { model: User, as: "extraMaterialbyid" },
                { model: Project, as: "projectid" },
            ],
        });

        res.status(201).json(fullOrder);
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
};
const getExtraMaterialByProjectId = async (req, res) => {
    const { projectId } = req.params;

    try {
        const extraMaterials = await extraMaterial.findAll({
            where: { project: projectId },
            include: [
                {
                    model: extraMaterialProduct,
                    include: [
                        {
                            model: Product,
                            as: "product",
                        },
                    ],
                },
                { model: User, as: "extraMaterialbyid" },
                { model: Project, as: "projectid" },
            ],
        });

        if (extraMaterials.length === 0) {
            return res.status(404).json({ message: "No extra materials found for this project" });
        }

        res.status(200).json(extraMaterials);
    } catch (error) {
        res.status(500).json({ message: "Error fetching extra materials", error });
    }
};
module.exports = {
    createextraMaterial,
    getExtraMaterialByProjectId,
};