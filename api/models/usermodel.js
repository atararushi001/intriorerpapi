const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Cities = require("./citiesModel");

("use strict");

const users = sequelize.define(
	"user",
	{
		user_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		fname: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		lname: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		Role: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		profilePicture: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		timestamps: true,
	}
);

users.belongsTo(Cities);

module.exports = users;
