const Package = require("../models/package.model"); // Adjust the path according to your project structure

// Create a new package
const createPackage = async (req, res) => {
    try {
        const { name, description, price } = req.body;

        // Create the package
        const pkg = await Package.create({
            name,
            description,
            price,
        });

        res.status(201).json(pkg);
    } catch (error) {
        res.status(500).json({ message: "Error creating package", error });
    }
};

// Get all packages
const getPackages = async (req, res) => {
    try {
        const packages = await Package.findAll();
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ message: "Error fetching packages", error });
    }
};

// Get a package by ID
const getPackageById = async (req, res) => {
    try {
        const pkg = await Package.findByPk(req.params.id);
        if (!pkg) {
            return res.status(404).json({ message: "Package not found" });
        }
        res.status(200).json(pkg);
    } catch (error) {
        res.status(500).json({ message: "Error fetching package", error });
    }
};

// Update a package
const updatePackage = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;

        const pkg = await Package.findByPk(id);
        if (!pkg) {
            return res.status(404).json({ message: "Package not found" });
        }

        // Update the package
        await pkg.update({
            name,
            description,
            price,
        });

        res.status(200).json(pkg);
    } catch (error) {
        res.status(500).json({ message: "Error updating package", error });
    }
};

// Delete a package
const deletePackage = async (req, res) => {
    try {
        const { id } = req.params;
        const pkg = await Package.findByPk(id);
        if (!pkg) {
            return res.status(404).json({ message: "Package not found" });
        }

        await pkg.destroy();
        res.status(200).json({ message: "Package deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting package", error });
    }
};

module.exports = {
    createPackage,
    getPackages,
    getPackageById,
    updatePackage,
    deletePackage,
};
