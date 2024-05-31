const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

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
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const updateUser = async (req, res) => {
  try {
    const { email } = req.body;
    const userId = req.params.id;

    // Check if the email already exists and is associated with a different user
    if (email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser && existingUser.id !== parseInt(userId, 10)) {
        return res
          .status(400)
          .json({ error: "Email already in use by another user" });
      }
    }

    const [updated] = await User.update(req.body, {
      where: { id: userId },
    });

    if (updated) {
      const updatedUser = await User.findByPk(userId);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
