const Countries = require("../models/countries.model");
const States = require("../models/states.model");

exports.getAllCountries = async (req, res) => {
    try {
        const countries = await Countries.findAll();
        res.status(200).json({ countries });
    } catch (error) {
        console.error("Error getting countries:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.getAllStatesByCountryId = async (req, res) => {
    try {
        const country = await Countries.findByPk(req.params.id);
        if (!country) {
            return res.status(404).json({
                message: "Country not found",
            });
        }
        const states = await country.getStates();
        res.status(200).json({ states });
    } catch (error) {
        console.error("Error getting states:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.getAllCitiesByStateId = async (req, res) => {
    try {
        const state = await States.findByPk(req.params.id);
        if (!state) {
            return res.status(404).json({
                message: "State not found",
            });
        }
        const cities = await state.getCities();
        res.status(200).json({ cities });
    } catch (error) {
        console.error("Error getting cities:", error);
        res.status(500).json({ message: error.message });
    }
};
