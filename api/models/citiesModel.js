const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

("use strict");

const Cities = sequelize.define("cities", {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING(150),
		allowNull: false,
	},
});

module.exports = Cities;
