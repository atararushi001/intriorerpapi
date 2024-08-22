const ExtraWork = require("../models/extraWork.model");
const Project = require("../models/project.model");

// Create a new extra work
const createExtraWork = async (req, res) => {
    try {
        const { name, description, price, ProjectId, Height, Width, sqft } = req.body;
        const imageUrl = req.file?.path
            ? req.file.path.replace(/\\/g, "/").split("public")[1]
            : "";

        const project = await Project.findByPk(ProjectId);
        if (!project) {
            return res.status(400).json({ message: "Project not found" });
        }

        const extraWork = await ExtraWork.create({
            name,
            description,
            price,
            ProjectId,
            Height,
            Width,
            sqft,
            imageUrl,
        });

        res.status(201).json(extraWork);
    } catch (error) {
        res.status(500).json({ message: "Error creating extra work", error });
    }
};

// Get all extra works
const getExtraWorks = async (req, res) => {
    try {
        const extraWorks = await ExtraWork.findAll({
            include: { model: Project },
        });
        res.status(200).json(extraWorks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching extra works", error });
    }
};

// Get an extra work by ID
const getExtraWorkById = async (req, res) => {
    try {
        const extraWork = await ExtraWork.findByPk(req.params.id, {
            include: { model: Project },
        });
        if (!extraWork) {
            return res.status(404).json({ message: "Extra work not found" });
        }
        res.status(200).json(extraWork);
    } catch (error) {
        res.status(500).json({ message: "Error fetching extra work", error });
    }
};
// Get extra works by ProjectId
const getExtraWorkByProjectId = async (req, res) => {
    try {
        const { projectId } = req.params;
        const extraWorks = await ExtraWork.findAll({
            where: { ProjectId: projectId },
            include: { model: Project },
        });
        if (extraWorks.length === 0) {
            return res.status(404).json({ message: "No extra works found for this project" });
        }
        res.status(200).json(extraWorks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching extra works by project ID", error });
    }
};

// Update an extra work
const updateExtraWork = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, ProjectId, Height, Width, sqft } = req.body;
        const imageUrl = req.file?.path
            ? req.file.path.replace(/\\/g, "/").split("public")[1]
            : "";

        const extraWork = await ExtraWork.findByPk(id);
        if (!extraWork) {
            return res.status(404).json({ message: "Extra work not found" });
        }

        // Check if the project exists if it's being updated
        if (ProjectId) {
            const project = await Project.findByPk(ProjectId);
            if (!project) {
                return res.status(400).json({ message: "Project not found" });
            }
        }

        // Update the extra work
        await extraWork.update({
            name,
            description,
            price,
            ProjectId,
            Height,
            Width,
            sqft,
            imageUrl,
        });

        res.status(200).json(extraWork);
    } catch (error) {
        res.status(500).json({ message: "Error updating extra work", error });
    }
};

// Delete an extra work
const deleteExtraWork = async (req, res) => {
    try {
        const { id } = req.params;
        const extraWork = await ExtraWork.findByPk(id);
        if (!extraWork) {
            return res.status(404).json({ message: "Extra work not found" });
        }

        await extraWork.destroy();
        res.status(200).json({ message: "Extra work deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting extra work", error });
    }
};

module.exports = {
    createExtraWork,
    getExtraWorks,
    getExtraWorkById,
    getExtraWorkByProjectId,
    updateExtraWork,
    deleteExtraWork,
};