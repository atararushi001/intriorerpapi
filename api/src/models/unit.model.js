const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");

const Unit = sequelize.define(
    "unit",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = Unit;
