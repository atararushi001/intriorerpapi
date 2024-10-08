const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Project = require("./project.model");

const Design = sequelize.define(
    "Design",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        designapprovalbyclient: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        feedbackgivenbyclient: {
            type: DataTypes.TEXT,
            allowNull: true,
            // defaultValue: false
        },
        file_path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    },
);


module.exports = Design;
