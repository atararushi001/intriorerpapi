const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const { Op } = require("sequelize");


const createUser = async (req, res) => {
  console.log(req.body);
  try {
    const hashedPassword = await bcrypt.hash(req.body.password || "", 10);
    const profilePicture = req.file?.path
      ? req.file.path.replace(/\\/g, "/").split("public")[1]
      : "";

    const userData = {
      ...req.body,
      password: hashedPassword,
      profilePhoto: profilePicture,
    };

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email: req.body.email }, { phone: req.body.phone }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email or phone already in use" });
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
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      phone,
      address,
      password,
      profileImage,
      role,
      cityId,
    } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if email or phone is already used by another user
    const existingUser = await User.findOne({
      where: {
        id: { [Op.ne]: id },
        [Op.or]: [{ email }, { phone }],
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or phone already in use by another user" });
    }

    // Update the user
    await user.update({
      name,
      email,
      phone,
      address,
      password,
      profileImage,
      role,
      CityId: cityId,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
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
