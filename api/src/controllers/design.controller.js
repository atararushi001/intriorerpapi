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

exports.storeDesign = storeDesign;
