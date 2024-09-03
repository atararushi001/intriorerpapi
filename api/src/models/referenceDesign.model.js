const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Project = require("./project.model");
const User = require("./user.model");

const referenceDesign = sequelize.define(
    "referenceDesign",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
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


referenceDesign.belongsTo(User, {
    as: "createdByid",
    foreignKey: "createdBy",
    allowNull: true,
});
module.exports = referenceDesign;
