const ExtraWork = require("../models/extraWork.model");
const Package = require("../models/package.model");
const User = require("../models/usermodel");

// Create a new project
const createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      start_date,
      end_date,
      total_amount,
      currently_paid_amount,
      left_amount,
      extra_work_id,
      package_id,
      location_id,
      client_id,
      designer_id,
      head_carpenter_id,
      created_by,
      status,
    } = req.body;

    // Check if related records exist
    const package = await Package.findByPk(package_id);
    if (!package) {
      return res.status(400).json({ message: "Package not found" });
    }
    const location = await Location.findByPk(location_id);
    if (!location) {
      return res.status(400).json({ message: "Location not found" });
    }
    const client = await User.findByPk(client_id);
    if (!client) {
      return res.status(400).json({ message: "Client not found" });
    }
    const creator = await User.findByPk(created_by);
    if (!creator) {
      return res.status(400).json({ message: "Creator not found" });
    }

    // Create the project
    const project = await Project.create({
      name,
      description,
      start_date,
      end_date,
      total_amount,
      currently_paid_amount,
      left_amount,
      extra_work_id,
      package_id,
      location_id,
      client_id,
      designer_id,
      head_carpenter_id,
      created_by,
      status,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error creating project", error });
  }
};

// Get all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        { model: ExtraWork },
        { model: Package },
        // { model: Location },
        { model: User, as: "Client" },
        { model: User, as: "Designer" },
        { model: User, as: "HeadCarpenter" },
        { model: User, as: "Creator" },
      ],
    });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
};

// Get a project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [
        { model: ExtraWork },
        { model: Package },
        { model: Location },
        { model: User, as: "Client" },
        { model: User, as: "Designer" },
        { model: User, as: "HeadCarpenter" },
        { model: User, as: "Creator" },
      ],
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error fetching project", error });
  }
};

// Update a project
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      start_date,
      end_date,
      total_amount,
      currently_paid_amount,
      left_amount,
      extra_work_id,
      package_id,
      location_id,
      client_id,
      designer_id,
      head_carpenter_id,
      created_by,
      status,
    } = req.body;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if related records exist
    if (package_id) {
      const package = await Package.findByPk(package_id);
      if (!package) {
        return res.status(400).json({ message: "Package not found" });
      }
    }
    if (location_id) {
      const location = await Location.findByPk(location_id);
      if (!location) {
        return res.status(400).json({ message: "Location not found" });
      }
    }
    if (client_id) {
      const client = await User.findByPk(client_id);
      if (!client) {
        return res.status(400).json({ message: "Client not found" });
      }
    }
    if (created_by) {
      const creator = await User.findByPk(created_by);
      if (!creator) {
        return res.status(400).json({ message: "Creator not found" });
      }
    }

    // Update the project
    await project.update({
      name,
      description,
      start_date,
      end_date,
      total_amount,
      currently_paid_amount,
      left_amount,
      extra_work_id,
      package_id,
      location_id,
      client_id,
      designer_id,
      head_carpenter_id,
      created_by,
      status,
    });

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error updating project", error });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.destroy();
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
