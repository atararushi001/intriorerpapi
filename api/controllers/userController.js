const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

exports.registerUser = async (req, res) => {
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

exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll();

		res.status(200).json({ users });
	} catch (error) {
		console.error("Error getting users:", error);
		res.status(500).json({ message: error.message });
	}
};
