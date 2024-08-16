const PunchInUser = require("../models/punch_in_user.model");
const Project = require("../models/project.model");
const User = require("../models/user.model");

// Method to create a new punch-in record
const createPunchIn = async (req, res) => {
    try {
        const punchinimages = req.file?.path
        ? req.file.path.replace(/\\/g, "/").split("public")[1]
        : "";
        const {  projectid, client_id } = req.body;

        const punchIn = await PunchInUser.create({
            file_path:punchinimages,
            projectid,
            client_id,
        });

        res.status(201).json({
            message: "Punch-in record created successfully",
            punchIn,
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating punch-in record", error });
    }
};

// Method to get punch-in records by projectId and userId
const getPunchInByProjectAndUser = async (req, res) => {
    try {
        const { projectId, userId } = req.params;

        const punchInRecords = await PunchInUser.findAll({
            where: {
                projectId,
                userId,
            },
            include: [
                { model: Project, as: "Project" },
                { model: User, as: "Client" },
            ],
        });

        res.status(200).json(punchInRecords);
    } catch (error) {
        res.status(500).json({ message: "Error fetching punch-in records", error });
    }
};

module.exports = {
    createPunchIn,
    getPunchInByProjectAndUser,
};