const Site = require('../models/sitemodel');

exports.createSite = async (req, res) => {
  try {
    const newSite = await Site.create({
      name: req.body.name,
      package: req.body.package,
      designer: req.body.designer,
      city: req.body.city,
      state: req.body.state,
      Country: req.body.Country,
    });

    res.status(201).json({ message: "Site created successfully", site: newSite });
  } catch (error) {
    console.error("Error creating site:", error);

    if (error.name === "SequelizeValidationError") {
      // Handle Sequelize validation errors
      const validationErrors = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));
      res.status(400).json({ errors: validationErrors });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};


exports.editSite = async (req, res) => {
    try {
      const updatedSite = await Site.update(req.body, {
        where: { id: req.params.id },
      });
  
      res.status(200).json({ message: "Site updated successfully", site: updatedSite });
    } catch (error) {
      console.error("Error updating site:", error);
      res.status(500).json({ message: error.message });
    }
  };
  
  
  exports.deleteSite = async (req, res) => {
    try {
      await Site.destroy({
        where: { id: req.params.id },
      });
  
      res.status(200).json({ message: "Site deleted successfully" });
    } catch (error) {
      console.error("Error deleting site:", error);
      res.status(500).json({ message: error.message });
    }
  };
  

  exports.getAllSites = async (req, res) => {
    try {
      const sites = await Site.findAll();
  
      res.status(200).json({ sites });
    } catch (error) {
      console.error("Error getting sites:", error);
      res.status(500).json({ message: error.message });
    }
  };

  exports.getSitesbyid = async (req, res) => {
    try {
      const sites = await Site.findAll().where({site_id: req.params.site_id});
  
      res.status(200).json({ sites });
    } catch (error) {
      console.error("Error getting sites:", error);
      res.status(500).json({ message: error.message });
    }
  };