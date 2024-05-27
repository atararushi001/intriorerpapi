const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Cities = require("./citiesModel");

("use strict");

const Sites = sequelize.define(
	"Sites",
	{
		name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		address:{
			type: DataTypes.STRING,
			allowNull: true,
		},
		
		created_by: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		package: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		designer: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		isactive: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		isactive: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		isdeleted: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		deleted_by: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		deleted_at: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		timestamps: true,
	}
);

Sites.belongsTo(Cities);

module.exports = Sites;
