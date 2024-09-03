const referenceDesign = require("../models/referenceDesign.model");
const Project = require("../models/project.model");
const User = require("../models/user.model");

const storeDesign = async (req, res) => {
    const designImage = req.file?.path
        ? req.file.path.replace(/\\/g, "/").split("public")[1]
        : "";

    const design = {
        ...req.body,
        file_path: designImage,
    };
    try {
        const newDesign = await referenceDesign.create(design);
        res.status(201).json(newDesign);
    } catch (error) {
        res.status(500).json({ message: "Error storing design", error });
    }
};

const getDesignById = async (req, res) => {
    const { id } = req.params;

    try {
        const design = await referenceDesign.findByPk(id, {
            include: [
                { model: Project, as: "projectid" },
                { model: User, as: "createdByid" },
            ],
        });
        if (!design) {
            return res.status(404).json({ error: "Design not found" });
        }

        res.json(design);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateDesign = async (req, res) => {
    const { id } = req.params;
    const { name, description, project, createdBy } = req.body;

    const designImage = req.file?.path
        ? req.file.path.replace(/\\/g, "/").split("public")[1]
        : "";

    try {
        const design = await referenceDesign.findByPk(id);

        if (!design) {
            return res.status(404).json({ error: "Design not found" });
        }

        design.name = name;
        design.description = description;
        design.file_path = designImage || design.file_path;
        design.project = project;
        design.createdBy = createdBy;

        await design.save();

        res.status(200).json(design);
    } catch (error) {
        res.status(500).json({ message: "Error updating design", error });
    }
};
const getDesignsByProjectId = async (req, res) => {
    const { projectId } = req.params;

    try {
        const designs = await referenceDesign.findAll({
            where: { project: projectId },
            include: [
                { model: Project, as: "projectid" },
                { model: User, as: "createdByid" },
            ],
        });
        if (designs.length === 0) {
            return res.status(404).json({ error: "No designs found for this project" });
        }

        res.json(designs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    storeDesign,
    getDesignById,
    updateDesign,
    getDesignsByProjectId,
};