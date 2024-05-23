const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel"); 


exports.registerUser = async (req, res) => {
console.log(req.body);
    try {
      const hashedPassword = await bcrypt.hash(req.body.password || "", 10);
  
      const newUser = await User.create({
        fname: req.body.fname || "",
        lname: req.body.lname || "",
        email: req.body.email || "",
        phone: req.body.phone || "",
        address: req.body.address || "",
        city: req.body.city || "",
        state: req.body.state || "",
        Country: req.body.Country || "",
        Role: req.body.Role || "",
        password: hashedPassword,
      });
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
  
      if (error.name === "SequelizeValidationError") {
        // Handle Sequelize validation errors
        const validationErrors = error.errors.map((err) => ({
          field: err.path,
          message: err.message,
        }));
        res.status(400).json({ errors: validationErrors });
      } else if (error.name == "Email already exists") {
        error.message = "Email already exists";
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();
  
      res.status(200).json({ users });
    } catch (error) {
      console.error("Error getting users:", error);
      res.status(500).json({ message: error.message });
    }
  };