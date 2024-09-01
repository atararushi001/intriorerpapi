const Project = require("../models/project.model");
const User = require("../models/user.model");
const order = require("../models/order.model");
const Product = require("../models/product.model");
const totalprojctcount = async (req, res) => {
    try {
        const totalprojectcount = await Project.count({});
        res.status(200).json({
            "success":true,
            "count":totalprojectcount
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};
const totalprojctbyclientid = async (req, res) => {
    try {
        const totalprojectcount = await Project.count({
            where: {
                client_id: req.params.id,
            },
        });
        res.status(200).json(
            {
                "success":true,
                "count":totalprojectcount
            }
        );
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};
const totalprojctbycompetebyclientid = async (req, res) => {
    try {
        const totalprojectcount = await Project.count({
            where: {
                client_id: req.params.id,
                status: "complete",
            },
        });
        res.status(200).json(totalprojectcount);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};
const totalprojctbyhead_carpenter_id = async (req, res) => {
    try {
        const totalprojectcount = await Project.count({
            where: {
                head_carpenter_id: req.params.id,
            },
        });
        res.status(200).json(totalprojectcount);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};
const totalprojctcompletebyhead_carpenter_id = async (req, res) => {
    try {
        const totalprojectcount = await Project.count({
            where: {
                head_carpenter_id: req.params.id,
                status: "complete", 
            },
        });
        res.status(200).json(totalprojectcount);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};
const totalprojctbysupervisor_id = async (req, res) => {
    try {
        const totalprojectcount = await Project.count({
            where: {
                supervisor_id: req.params.id,
            },
        });
        res.status(200).json(totalprojectcount);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};
const totalprojctbydesigner_id = async (req, res) => {
    try {
        const totalprojectcount = await Project.count({
            where: {
                designer_id: req.params.id,
            },
        });
        res.status(200).json(totalprojectcount);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};

const totalprojctcompletebydesigner_id = async (req, res) => {
    try {
        const totalprojectcount = await Project.count({
            where: {
                designer_id: req.params.id,
                status: "complete",
            },
        });
        res.status(200).json(totalprojectcount);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};
const totalprojctpandingbydesigner_id = async (req, res) => {
    try {
        const totalprojectcount = await Project.count({
            where: {
                designer_id: req.params.id,
                status: { $ne: "complete" },
            },
        });
        res.status(200).json(totalprojectcount);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};
const totalorder = async (req, res) => {
    try {
        const totalprojectcount = await order.count({});
        res.status(200).json(totalprojectcount);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};

const totalorderhead_carpenter_id = async (req, res) => {
    try {
        const totalprojectcount = await order.count({
            where: {
                orderBy: req.params.id,
            },
        });
        res.status(200).json(totalprojectcount);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};
const totalordercountdelivereryboybyid = async (req, res) => {
    try {
        const totalprojectcount = await order.count({
            where: {
                deliveredById: req.params.id,
            },
        });
        res.status(200).json(totalprojectcount);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};
const totalorderpandngdelivereryboybyid = async (req, res) => {
    try {
        const totalprojectcount = await order.count({
            where: {
                deliveredById: req.params.id,
                status : "dispatched"
            
            },
        });
        res.status(200).json(totalprojectcount);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};
const totalorderdelivered = async (req, res) => {
    try {
        const totalprojectcount = await order.count({
            where: {
                status: "delivered",
            },
        });
        res.status(200).json(totalprojectcount);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};
const totalorderPending = async (req, res) => {
    try {
        const totalprojectcount = await order.count({
            where: {
                status: "Pending ",
            },
        });
        res.status(200).json(totalprojectcount);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};
const totalproduct = async (req, res) => {
    try {
        const totalprojectcount = await Product.count({});
        res.status(200).json(totalprojectcount);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};
const totaldesignercoount = async (req, res) => {
    try {
        const totalprojectcount = await User.count({
            where: {
                role: "Designer",
            },
        });
        res.status(200).json(totalprojectcount);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};
const totalheadcarpentercount = async (req, res) => {
    try {
        const totalprojectcount = await User.count({
            where: {
                role: "Head Carpenter",
            },
        });
        res.status(200).json(totalprojectcount);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
}
const totalclientcount = async (req, res) => {
    try {
        const totalprojectcount = await User.count({
            where: {
                role: "Client",
            },
        });
        res.status(200).json(totalprojectcount);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
}
module.exports = {
    totalprojctcount,
    totalprojctbyclientid,
    totalprojctbycompetebyclientid,
    totalprojctbyhead_carpenter_id,
    totalprojctcompletebyhead_carpenter_id,
    totalprojctbysupervisor_id,
    totalprojctbydesigner_id,
    totalprojctcompletebydesigner_id,
    totalprojctpandingbydesigner_id,
    totalorder,
    totalorderdelivered,
    totalorderPending,
    totalorderhead_carpenter_id,
    totalordercountdelivereryboybyid,
    totalorderpandngdelivereryboybyid,
    totalproduct,
    totalclientcount,
    totalheadcarpentercount,
    totaldesignercoount,
};
