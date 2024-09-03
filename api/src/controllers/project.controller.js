const ExtraWork = require("../models/extraWork.model");
const Package = require("../models/package.model");
const Project = require("../models/project.model");
const Project_Sub_Stage = require("../models/project_sub_stage.model");
const project_Stage = require("../models/project_stage.model");
const User = require("../models/user.model");
const Design = require("../models/design.model");
const Task = require("../models/task.model");
const referenceDesign = require("../models/referenceDesign.model");

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
            location_auto,
            location_manual,
            client_id,
            designer_id,
            head_carpenter_id,
            created_by,
            status,
            packageId,
        } = req.body;

        // Check if head_carpenter_id exists in Users table
        const headCarpenter = await User.findByPk(head_carpenter_id);
        if (!headCarpenter) {
            return res
                .status(400)
                .json({ message: "Invalid head_carpenter_id" });
        }

        // Create the project
        const project = await Project.create({
            name,
            description,
            packageId,
            start_date,
            end_date,
            total_amount,
            currently_paid_amount,
            left_amount,
            extra_work_id,
            package_id,
            location_auto,
            location_manual,
            client_id,
            designer_id,
            head_carpenter_id,
            created_by,
            status,
        });
        const projectid = project.id;
        // Create stages
        const rawStage = await project_Stage.create({
            name: "Raw",
            project_id: projectid,
        });
        const laminateStage = await project_Stage.create({
            name: "Laminate",
            project_id: projectid,
        });

        // Create sub-stages for Raw stage
        const popSubStage = await Project_Sub_Stage.create({
            name: "POP`",
            projectStageId: rawStage.id,
        });
        const electricalSubStage = await Project_Sub_Stage.create({
            name: "Electrical",
            projectStageId: rawStage.id,
        });
        const carpentrySubStage = await Project_Sub_Stage.create({
            name: "Carpentry work",
            projectStageId: rawStage.id,
        });

        // Create sub-stage for Laminate stage
        const laminationSubStage = await Project_Sub_Stage.create({
            name: "Lamination",
            projectStageId: laminateStage.id,
        });

        // Predefined tasks for sub-stages
        const predefinedTasks = {
            POP: [
                "pop leve",
                "gypsum bran",
                "fan cente",
                "pelmet to ceiling height",
                "if design getting cut in wardrobe",
                "light cutting",
            ],
            Electrical: [
                "tv unit cabling",
                "calculate total circuit and",
                "look if enough switch or",
                "plug points are there or not",
                "AC wire line required or not",
                "plug point for chimney",
                "8M side by side to bed",
                "plug point for dressing",
                "plug points for study",
                "is there any point for wall",
                "mount light which is shown in 3D",
            ],
            Carpentry: [
                "Raw work according to designs",
                "check wardrobe drawer finishing and working",
                "check if there is any plywood used for paneling",
                "bed design check",
                "manual or hydraulic check",
                "space for plates in kitchen unit",
                "check carpenter has cut switchboards in tv unit, dressing, side tables",
            ],
            Lamination: [
                "Laminate finishing photos",
                "Handle received or not",
                "cnc received or not",
                "mdf paneling is done or not",
                "wainscot done or not",
                "is there light point in paneling done or not",
            ],
        };

        // Create tasks for each sub-stage
        for (const task of predefinedTasks.POP) {
            await Task.create({
                name: task,
                ProjectSubStageId: popSubStage.id,
            });
        }
        for (const task of predefinedTasks.Electrical) {
            await Task.create({
                name: task,
                ProjectSubStageId: electricalSubStage.id,
            });
        }
        for (const task of predefinedTasks.Carpentry) {
            await Task.create({
                name: task,
                ProjectSubStageId: carpentrySubStage.id,
            });
        }
        for (const task of predefinedTasks.Lamination) {
            await Task.create({
                name: task,
                ProjectSubStageId: laminationSubStage.id,
            });
        }

        res.status(201).json({
            message: "Project created successfully",
            project,
        });
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
                { model: Package, as: "Package" },
                // { model: Location },
                { model: User, as: "Client" },

                {
                    model: project_Stage,
                    as: "project_Stage",
                    include: [
                        {
                            model: Project_Sub_Stage,
                            as: "Project_Sub_Stages",
                            include: {
                                model: Task,
                                as: "Tasks",
                            },
                        },
                    ],
                },

                { model: User, as: "Designer" },
                { model: User, as: "HeadCarpenter" },
                { model: User, as: "Supervisor" },
                { model: Design, as: "Designs" },
                { model: referenceDesign, as: "referenceDesigns" },

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
                { model: Package, as: "Package" },
                // { model: Location },
                { model: User, as: "Client" },
                {
                    model: project_Stage,
                    as: "project_Stage",
                    include: [
                        {
                            model: Project_Sub_Stage,
                            as: "Project_Sub_Stages", // Ensure this alias matches your model definition
                        },
                    ],
                },
                { model: User, as: "Designer" },
                { model: User, as: "HeadCarpenter" },
                { model: User, as: "Supervisor" },
                { model: Design, as: "Designs" },
                { model: referenceDesign, as: "referenceDesign" },

                // { model: User, as: "Creator" },
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

// get a project by client_id
const getProjectsByClientId = async (req, res) => {
    try {
        const projects = await Project.findAll({
            where: { client_id: req.params.id },
            include: [
                { model: ExtraWork },
                { model: Package, as: "Package" },
                // { model: Location },
                {
                    model: project_Stage,
                    as: "project_Stage",
                    include: [
                        {
                            model: Project_Sub_Stage,
                            as: "Project_Sub_Stages", // Ensure this alias matches your model definition
                        },
                    ],
                },
                { model: User, as: "Client" },
                { model: User, as: "Designer" },
                { model: User, as: "HeadCarpenter" },
                { model: User, as: "Supervisor" },
                { model: Design, as: "Designs" },
                { model: referenceDesign, as: "referenceDesigns" },
            ],
        });
        if (!projects || projects.length === 0) {
            return res
                .status(404)
                .json({ message: "No projects found for this client" });
        }
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Error fetching projects", error });
    }
};
//get project by head_carpenter_id
const getProjectsByhead_carpenter_id = async (req, res) => {
    try {
        const projects = await Project.findAll({
            where: { head_carpenter_id: req.params.id },
            include: [
                { model: ExtraWork },
                { model: Package, as: "Package" },
                // { model: Location },
                {
                    model: project_Stage,
                    as: "project_Stage",
                    include: [
                        {
                            model: Project_Sub_Stage,
                            as: "Project_Sub_Stages", // Ensure this alias matches your model definition
                        },
                    ],
                },
                { model: User, as: "Client" },
                { model: User, as: "Designer" },
                { model: User, as: "HeadCarpenter" },
                { model: User, as: "Supervisor" },
                { model: Design, as: "Designs" },
                { model: referenceDesign, as: "referenceDesigns" },
            ],
        });
        if (!projects || projects.length === 0) {
            return res
                .status(404)
                .json({ message: "No projects found for this designer" });
        }
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Error fetching projects", error });
    }
};

// Get a project by  Designer_id
const getProjectsByDesignerId = async (req, res) => {
    try {
        const projects = await Project.findAll({
            where: { designer_id: req.params.id },
            include: [
                { model: ExtraWork },
                { model: Package, as: "Package" },
                // { model: Location },
                {
                    model: project_Stage,
                    as: "project_Stage",
                    include: [
                        {
                            model: Project_Sub_Stage,
                            as: "Project_Sub_Stages", // Ensure this alias matches your model definition
                        },
                    ],
                },
                { model: User, as: "Client" },
                { model: User, as: "Designer" },
                { model: User, as: "HeadCarpenter" },
                { model: User, as: "Supervisor" },
                { model: Design, as: "Designs" },
                { model: referenceDesign, as: "referenceDesigns" },
            ],
        });
        if (!projects || projects.length === 0) {
            return res
                .status(404)
                .json({ message: "No projects found for this designer" });
        }
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Error fetching projects", error });
    }
};
// get a project by supervisor_id
const getProjectsBysupervisorId = async (req, res) => {
    try {
        const projects = await Project.findAll({
            where: { supervisor_id: req.params.id },
            include: [
                { model: ExtraWork },
                { model: Package, as: "Package" },
                // { model: Location },
                {
                    model: project_Stage,
                    as: "project_Stage",
                    include: [
                        {
                            model: Project_Sub_Stage,
                            as: "Project_Sub_Stages", // Ensure this alias matches your model definition
                        },
                    ],
                },
                { model: User, as: "Client" },
                { model: User, as: "Designer" },
                { model: User, as: "HeadCarpenter" },
                { model: User, as: "Supervisor" },
                { model: Design, as: "Designs" },
                { model: referenceDesign, as: "referenceDesigns" },
            ],
        });
        if (!projects || projects.length === 0) {
            return res
                .status(404)
                .json({ message: "No projects found for this designer" });
        }
        res.status(200).json(projects);
    } catch (error) {
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
            location_auto,
            location_manual,
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
            location_auto,
            location_manual,
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

const assignDesigner = async (req, res) => {
    try {
        const { id } = req.params;
        const { designer_id } = req.body;

        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const designer = await User.findByPk(designer_id);
        if (!designer) {
            return res.status(400).json({ message: "Designer not found" });
        }

        // Update the project
        await project.update({ designer_id });

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: "Error assigning designer", error });
    }
};
const assignSupervisor = async (req, res) => {
    try {
        const { id } = req.params;
        const { supervisor_id } = req.body;

        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const designer = await User.findByPk(supervisor_id);
        if (!designer) {
            return res.status(400).json({ message: "Supervisor not found" });
        }

        // Update the project
        await project.update({ supervisor_id });

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: "Error assigning Supervisor", error });
    }
};
const assignHeadCarpenter = async (req, res) => {
    try {
        const { id } = req.params;
        const { head_carpenter_id } = req.body;

        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const headCarpenter = await User.findByPk(head_carpenter_id);
        if (!headCarpenter) {
            return res
                .status(400)
                .json({ message: "Head Carpenter not found" });
        }

        // Update the project
        await project.update({ head_carpenter_id });

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({
            message: "Error assigning head carpenter",
            error,
        });
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
// Update project status by projectStageId
const updateProjectStatus = async (req, res) => {
    try {
        const { projectID } = req.params.id;
        const { status } = req.body;
        // Fetch the project by projectStageId\
        console.log("Project is ", projectID);
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        // Update the status based on the value received from the API
        if (status === "row") {
            project.status = "row";
        } else if (status === "laminate") {
            project.status = "laminate";
        } else if (status === "handover") {
            project.status = "handover";
        } else if (status === "Complete") {
            project.status = "Complete";
        } else {
            return res.status(400).json({ message: "Invalid status value" });
        }

        // Save the updated project
        await project.save();

        res.status(200).json({
            message: "Project status updated successfully",
            project,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating project status",
            error,
        });
    }
};
const getTasksByProjectId = async (req, res) => {
    try {
        const { projectId } = req.params;

        // Fetch project stages by project ID
        const projectStages = await project_Stage.findAll({
            where: { projectId },
            include: {
                model: Project_Sub_Stage,
                include: {
                    model: Task,
                },
            },
        });

        if (!projectStages.length) {
            return res
                .status(404)
                .json({ message: "No stages found for the given project ID" });
        }

        // Structure the response
        const response = projectStages.map((stage) => ({
            stageName: stage.name,
            subStages: stage.Project_Sub_Stages.map((subStage) => ({
                subStageName: subStage.name,
                tasks: subStage.Tasks.map((task) => ({
                    taskId: task.id,
                    taskName: task.name,
                })),
            })),
        }));

        res.status(200).json(response);
    } catch (error) {
        console.log("Error is", error);
        res.status(500).json({
            message: "Error fetching tasks",
            error: error.message,
        });
    }
};

module.exports = {
    updateProjectStatus,
    createProject,
    getProjects,
    getProjectById,
    getProjectsByClientId,
    getProjectsByDesignerId,
    getProjectsBysupervisorId,
    getProjectsByhead_carpenter_id,
    updateProject,
    assignDesigner,
    assignHeadCarpenter,
    assignSupervisor,
    deleteProject,
    getTasksByProjectId,
};
