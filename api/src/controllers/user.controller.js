const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { Op } = require("sequelize");

const Project = require("../models/project.model");


const Cities = require("../models/cities.model");
const States = require("../models/states.model");
const Countries = require("../models/countries.model");

const createUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password || "", 10);
        const profilePicture = req.file?.path
            ? req.file.path.replace(/\\/g, "/").split("public")[1]
            : "";

        const userData = {
            ...req.body,
            password: hashedPassword,
            profilePicture: profilePicture,
        };

        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ email: req.body.email }, { phone: req.body.phone }],
            },
        });

        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Email or phone already in use" });
        }

        const user = await User.create(userData);

        res.status(201).json({ message: "User registered successfully", user });
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

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({

            include: [{ model: Project }],

            include: [
                { model: Cities, as: "city", 
                         include: [
                    {
                        model: States,  
                        include: [{ model: Countries }],
                    }, 
                ] }, // Add a comma here
            ],

        });
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

// Get a user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id,{
            include: [
                { model: Cities, as: "city", 
                         include: [
                    {
                        model: States,  
                        include: [{ model: Countries }],
                    }, 
                ] }, // Add a comma here
            ],
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
};

const updateUser = async (req, res) => {
 
    const profilePicture = req.file?.path
    ? req.file.path.replace(/\\/g, "/").split("public")[1]
    : "";
    const hashedPassword = await bcrypt.hash(req.body.password || "", 10);
    try {
        const { id } = req.params;
        // const {
        //     name,
        //     email,
        //     phone,
        //     address,
        //     password,
        //     cityId,
        // } = req.body;
        
        const userData = {
            name : req.body.name,
            email : req.body.email,
            phone : req.body.phone,
            address : req.body.address,
            cityId : req.body.cityId,
        };

        const user = await User.findByPk(id,{
            include: [
                { model: Cities, as: "city", 
                         include: [
                    {
                        model: States,  
                        include: [{ model: Countries }],
                    }, 
                ] }, // Add a comma here
            ],
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if email or phone is already used by another user
        const existingUser = await User.findOne({
            where: {
                [Op.and]: {
                    id: { [Op.ne]: id },
                    [Op.or]: [{ email : userData.email }, { phone : userData.phone}],
                },
            },
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Email or phone already in use by another user",
            });
        }

        if (req.file?.path != null) {
            userData.profilePicture = profilePicture;
          }
          
        // Update the user
    
        // const userData = {
        //     ...req.body,
        //     password: hashedPassword,
        //     profilePicture: profilePicture,
        // };
     await User.update(userData, {
            where: {
              id: id,
            }
          });
          
          const updatedUser = await User.findByPk(id,{
            include: [
                { model: Cities, as: "city", 
                         include: [
                    {
                        model: States,  
                        include: [{ model: Countries }],
                    }, 
                ] }, // Add a comma here
            ],
        });

          // Send the updated user data in the response
          res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error : error.message });
    }
};

module.exports = updateUser;

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id,{
            include: [
                { model: Cities, as: "city", 
                         include: [
                    {
                        model: States,  
                        include: [{ model: Countries }],
                    }, 
                ] }, // Add a comma here
            ],
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.destroy();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};
