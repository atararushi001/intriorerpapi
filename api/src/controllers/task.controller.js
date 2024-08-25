const Task = require('../models/task.model');
const Project = require('../models/project.model');
const Project_Stage = require('../models/project_stage.model');
const Project_Sub_Stage = require('../models/project_sub_stage.model');

// Create a new task
const createTask = async (req, res) => {
    const { name, projectId, projectStageId, projectSubStageId } = req.body;

    try {
        const task = await Task.create({
            name,
            ProjectId: projectId,
            ProjectStageId: projectStageId,
            ProjectSubStageId: projectSubStageId,
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error: error.message });
    }
};

// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            include: [Project, Project_Stage, Project_Sub_Stage],
        });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error: error.message });
    }
};
exports.getTasksByProjectId = async (req, res) => {
    const { projectId } = req.params;

    try {
        const tasks = await Task.findAll({
            where: { ProjectId: projectId },
            include: [Project, Project_Stage, Project_Sub_Stage],
        });
        if (!tasks.length) {
            return res.status(404).json({ message: "No tasks found for the given project ID" });
        }
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error: error.message });
    }
};
// Get a task by ID
const getTaskById = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findByPk(id, {
            include: [Project, Project_Stage, Project_Sub_Stage],
        });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error fetching task", error: error.message });
    }
};

// Update a task
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { name, description, photos, status, projectId, projectStageId, projectSubStageId } = req.body;

    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Handle image upload
        const updatedPhotos = req.files?.map(file => file.path.replace(/\\/g, "/").split("public")[1]) || photos;

        await task.update({
            name,
            description,
            photos: updatedPhotos,
            status,
            ProjectId: projectId,
            ProjectStageId: projectStageId,
            ProjectSubStageId: projectSubStageId,
        });

        res.status(200).json(task);
    } catch (error) {
        console.error("Error updating task:", error);

        if (error.name === "SequelizeValidationError") {
            // Handle Sequelize validation errors
            const validationErrors = error.errors.map((err) => ({
                field: err.path,
                message: err.message,
            }));
            res.status(400).json({ errors: validationErrors });
        } else {
            res.status(500).json({ message: "Error updating task", error: error.message });
        }
    }
};

module.exports = {
    updateTask,
};

// Delete a task
const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        await task.destroy();
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error: error.message });
    }
};

module.exports = {
    updateTask,
    getTaskById,
    getTasksByProjectId,
    getAllTasks,
    createTask,
    deleteTask
};

