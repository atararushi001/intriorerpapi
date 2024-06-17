const Product = require("../models/product.model");
const Unit = require("../models/unit.model");

// Create a new product
const createProduct = async (req, res) => {
    try {
        // Create the product
        const product = await Product.create(req.body);

        const createdProduct = await Product.findOne({
            where: {
                id: product.dataValues.id,
            },
            include: [{ model: Unit }],
        });

        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error });
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [{ model: Unit }],
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};

// Get a product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [{ model: Unit }],
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update the product
        await product.update(req.body);

        const updatedProduct = await Product.findOne({
            where: {
                id: product.dataValues.id,
            },
            include: [{ model: Unit }],
        });

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await product.destroy();
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
