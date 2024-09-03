const Project = require("../models/project.model");
const User = require("../models/user.model");
const order = require("../models/order.model");
const Product = require("../models/product.model");
const Design = require("../models/design.model");

const admindashboard = async (req, res) => {

    try {
        const totalprojectcount = await Project.count({});
        const totalordercount = await order.count({});
        const totalproductcount = await Product.count({});
        const totalcompleteprojectcount = await Project.count({
            where: {
                status: "complete",
            },
        });
        const totalpendingprojectcount = await Project.count({
            where: {
                status: "Pending",
            },
        });
        const totalpendingordercount = await order.count({
            where: {
                status: "pending",
            },
        });
        const totalcompletegordercount = await order.count({
            where: {
                status: "delivered",
            },
        });
        res.status(200).json({
            success:true,
            data: {
                totalproject: totalprojectcount,
                totalcompleteproject: totalcompleteprojectcount,
                totalpendingproject: totalpendingprojectcount,
                totalorder: totalordercount,
                totalpendingorder: totalpendingordercount,
                totalcompleteorder: totalcompletegordercount,
                totalproduct: totalproductcount,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }

}

const supervisordashboard = async (req, res) => {

    const id = req.params.id;

    try {
        const totalprojectcount = await Project.count({
            where: {
                supervisor_id: id,
            },
        });
        const totalordercount = await order.count({
             where: {
                orderBy: id,
            },
        });
        const totalproductcount = await Product.count({});
        const totalcompleteprojectcount = await Project.count({
            where: {
                supervisor_id: id,
                status: "complete",
            },
        });
        const totalpendingprojectcount = await Project.count({
            where: {
                supervisor_id: id,
                status: "Pending",
            },
        });
        const totalpendingordercount = await order.count({
            where: {
                orderBy: id,
                status: "pending",
            },
        });
        const totalcompletegordercount = await order.count({
            where: {
                orderBy: id,
                status: "delivered",
            },
        });
        res.status(200).json({
            success:true,
            data: {
                totalproject: totalprojectcount,
                totalcompleteproject: totalcompleteprojectcount,
                totalpendingproject: totalpendingprojectcount,
                totalorder: totalordercount,
                totalpendingorder: totalpendingordercount,
                totalcompleteorder: totalcompletegordercount,
                totalproduct: totalproductcount,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }

}

const clientdashboard = async (req, res) => {
    const id = req.params.id;

    try {
        const totalprojectcount = await Project.count({
            where: {
                client_id: id,
            },
        });
        const totalcompleteprojectcount = await Project.count({
            where: {
                client_id: id,
                status: "complete",
            },
        });
        const totalpendingprojectcount = await Project.count({
            where: {
                client_id: id,
                status: "Pending",
            },
        });
        res.status(200).json({
            success:true,
            data: {
                totalproject: totalprojectcount,
                totalcompleteproject: totalcompleteprojectcount,
                totalpendingproject: totalpendingprojectcount
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
}

const headcarpenterdashboard = async (req,res) => {
    const id = req.params.id;

    try {
        const totalprojectcount = await Project.count({
            where: {
                head_carpenter_id: id,
            },
        });
        const totalordercount = await order.count({
             where: {
                orderBy: id,
            },
        });
        const totalcompleteprojectcount = await Project.count({
            where: {
                head_carpenter_id: id,
                status: "complete",
            },
        });
        const totalpendingprojectcount = await Project.count({
            where: {
                head_carpenter_id: id,
                status: "Pending",
            },
        });
        res.status(200).json({
            success:true,
            data: {
                totalproject: totalprojectcount,
                totalcompleteproject: totalcompleteprojectcount,
                totalpendingproject: totalpendingprojectcount,
                totalorder: totalordercount,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
}

const factoryworkerdashboard = async (req,res) => {
    const id = req.params.id;

    try {
        const totalordercount = await order.count({});
        const totalproductcount = await Product.count({});
        const totalpendingordercount = await order.count({
            where: {
                dispatchBy: id,
                status: "dispatched",
            },
        });
        const totalcompletegordercount = await order.count({
            where: {
                dispatchBy: id,
                status: "delivered",
            },
        });
        res.status(200).json({
            success:true,
            data: {
                totalorder: totalordercount,
                totalpendingorder: totalpendingordercount,
                totalcompleteorder: totalcompletegordercount,
                totalproduct: totalproductcount,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
}

const deliveryboydashboard = async (req,res) => {
    const id = req.params.id;

    try {
        const totalordercount = await order.count({
            where: {
                deliveredBy: id,
                status: "dispatched",
            },
        });
        const totalpendingordercount = await order.count({
            where: {
                deliveredBy: id,
                status: "dispatched",
            },
        });
        const totalcompleteordercount = await order.count({
            where: {
                deliveredBy: id,
                status: "delivered",
            },
        });
        res.status(200).json({
            success:true,
            data: {
                totalorder: totalordercount,
                totalpendingorder: totalpendingordercount,
                totalcompleteorder: totalcompleteordercount,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
}

const designerdashboard = async (req, res) => {
    const id = req.params.id;

    try {
        // Get total project count
        const totalProjectCount = await Project.count({
            where: {
                designer_id: id,
            },
        });

        // Get all projects for the designer
        const projects = await Project.findAll({
            where: {
                designer_id: id,
            },
        });

        // Extract project IDs
        const projectIds = projects.map(project => project.id);

        // Count designs with approval by client
        const approvalDesignCount = await Design.count({
            where: {
                ProjectId: projectIds,
                designapprovalbyclient: true,
            },
        });

        // Count designs without approval by client
        const disapprovalDesignCount = await Design.count({
            where: {
                ProjectId: projectIds,
                designapprovalbyclient: false,
            },
        });

        // Send response
        res.status(200).json({
            success: true,
            data: {
                totalProject: totalProjectCount,
                approvalDesign: approvalDesignCount,
                disapprovalDesign: disapprovalDesignCount,
            }
        });
    } catch (error) {
        console.error("Error fetching designer dashboard data:", error); // Log error details
        res.status(500).json({ message: "Error fetching designer dashboard data", error: error.message });
    }
};

module.exports = {
    admindashboard,
    supervisordashboard,
    clientdashboard,
    headcarpenterdashboard,
    factoryworkerdashboard,
    deliveryboydashboard,
    designerdashboard
};
