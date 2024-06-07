const Design = require("../models/design.model");
const ExtraWork = require("../models/extraWork.model");
const Package = require("../models/package.model");
const Project = require("../models/project.model");
const User = require("../models/usermodel");

// Create a new project
const createProject = async (req, res) => {
  console.log("Here is body ", req.body);
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

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    console.log("Error is", error);
    res.status(500).json({ message: "Error creating project", error });
  }
};

// Get all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        { model: ExtraWork },
        { model: Design },
        // { model: Package },
        // { model: Location },
        { model: User, as: "Client" },
        { model: User, as: "Designer" },
        { model: User, as: "HeadCarpenter" },
        // { model: User, as: "Creator" },
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
        { model: Design },
        // { model: Package },
        // { model: Location },
        { model: User, as: "Client" },
        { model: User, as: "Designer" },
        { model: User, as: "HeadCarpenter" },
      ],
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    console.log("Error is", error);
    res.status(500).json({ message: "Error fetching project", error });
  }
};
const getProjectsByClientId = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { client_id: req.params.id },
      include: [
        { model: ExtraWork },
        { model: Design },
        // { model: Package },
        // { model: Location },
        { model: User, as: "Client" },
        { model: User, as: "Designer" },
        { model: User, as: "HeadCarpenter" },
      ],
    });
    if (!projects.length) {
      return res.status(404).json({ message: "No projects found for this client" });
    }
    res.status(200).json(projects);
  } catch (error) {
    console.log("Error is", error);
    res.status(500).json({ message: "Error fetching projects", error });
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
// Assign a designer to a project
const assignDesigner = async (req, res) => {
  try {
    const { id, designer_id } = req.body;

    // Find the project
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Find the designer
    const designer = await User.findByPk(designer_id);
    if (!designer) {
      return res.status(404).json({ message: "Designer not found" });
    }

    // Update the project's designer_id
    await project.update({ designer_id });

    res
      .status(200)
      .json({ message: "Designer assigned successfully", project });
  } catch (error) {
    res.status(500).json({ message: "Error assigning designer", error });
  }
};
const assignHeadCarpenter = async (req, res) => {
  try {
    const { id, head_carpenter_id } = req.body;

    // Find the project
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Find the head carpenter
    const headCarpenter = await User.findByPk(head_carpenter_id);
    if (!headCarpenter) {
      return res.status(404).json({ message: "Head Carpenter not found" });
    }

    // Update the project's head_carpenter_id
    await project.update({ head_carpenter_id });

    res
      .status(200)
      .json({ message: "Head Carpenter assigned successfully", project });
  } catch (error) {
    res.status(500).json({ message: "Error assigning Head Carpenter", error });
  }
};
module.exports = {
  getProjectsByClientId,
  assignHeadCarpenter,
  assignDesigner,
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
