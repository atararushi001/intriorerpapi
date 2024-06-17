const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Package = sequelize.define(
    "Package",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = Package;
