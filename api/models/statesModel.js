const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

("use strict");

const States = sequelize.define("states", {
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

module.exports = States;
