const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Project = require("./project.model");
const User = require("./user.model");

const punch_in_user = sequelize.define(
    "punch_in_user",
    {  
        file_path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    },
);
punch_in_user.belongsTo(Project, {
    as: "Project",
    foreignKey: "projectid",
    allowNull: true,
});
punch_in_user.belongsTo(User, {
    as: "Client",
    foreignKey: "client_id",
    allowNull: true,
});
module.exports = punch_in_user;
