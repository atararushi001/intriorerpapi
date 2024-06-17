const Unit = require("../models/unit.model");

const createUnit = async (req, res) => {
    try {
        const { name } = req.body;
        const unit = await Unit.create({ name });

        res.status(201).json(unit);
    } catch (error) {
        res.status(500).json({ message: "Error creating unit", error });
    }
};

const getUnits = async (req, res) => {
    try {
        const units = await Unit.findAll();
        res.status(200).json(units);
    } catch (error) {
        res.status(500).json({ message: "Error fetching units", error });
    }
};

const getUnitById = async (req, res) => {
    try {
        const unit = await Unit.findByPk(req.params.id);
        if (!unit) {
            return res.status(404).json({ message: "Unit not found" });
        }
        res.status(200).json(unit);
    } catch (error) {
        res.status(500).json({ message: "Error fetching unit", error });
    }
};

const updateUnit = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const unit = await Unit.findByPk(id);
        if (!unit) {
            return res.status(404).json({ message: "Unit not found" });
        }

        await unit.update({ name });

        res.status(200).json(unit);
    } catch (error) {
        res.status(500).json({ message: "Error updating unit", error });
    }
};

const deleteUnit = async (req, res) => {
    try {
        const { id } = req.params;
        const unit = await Unit.findByPk(id);
        if (!unit) {
            return res.status(404).json({ message: "Unit not found" });
        }

        await unit.destroy();
        res.status(200).json({ message: "Unit deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting unit", error });
    }
};

module.exports = {
    createUnit,
    getUnits,
    getUnitById,
    updateUnit,
    deleteUnit,
};
