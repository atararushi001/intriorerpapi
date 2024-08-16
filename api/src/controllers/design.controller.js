const Design = require("../models/design.model");

const storeDesign = async (req, res) => {
    const designImage = req.file?.path
        ? req.file.path.replace(/\\/g, "/").split("public")[1]
        : "";

    const design = {
        ...req.body,
        file_path: designImage,
    };
    try {
        const newDesign = await Design.create(design);
        res.status(201).json(newDesign);
    } catch (error) {
        res.status(500).json({ message: "Error storing design", error });
    }
};

const deleteDesign = async (req, res) => {
    
    const { id } = req.params;

    try {
        const design = await Design.findByPk(id);
        if (!design) {
            return res.status(404).json({ error: 'Design not found' });
        }
        await design.destroy();
        res.status(201).json(design);
    } catch (error) {
        res.status(500).json({ message: "Error storing design", error });
    }
};


const updateDesignApprovalAndFeedback = async (req, res) => {
    const { id } = req.params;
    const { designapprovalbyclient, feedbackgivenbyclient } = req.body;

    try {
        const design = await Design.findByPk(id);
        if (!design) {
            return res.status(404).json({ error: 'Design not found' });
        }

        design.designapprovalbyclient = designapprovalbyclient;
        design.feedbackgivenbyclient = feedbackgivenbyclient;

        await design.save();

        res.json(design);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    storeDesign,
    updateDesignApprovalAndFeedback,
    deleteDesign
};

// exports.storeDesign = storeDesign;
