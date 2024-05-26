const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel"); 
const countries = require("../models/Countriesmodel"); 

exports.getAllCountries = async (req, res) => {
    try {
        const Country = await countries.findAll();  

        res.status(200).json({ Country });
    } catch (error) {
        console.error("Error getting countries:", error);
        res.status(500).json({ message: error.message });
    }
};