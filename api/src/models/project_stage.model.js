const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Project = require("./project.model");
const Project_Sub_Stage = require("./project_sub_stage.model");

const project_Stage = sequelize.define("project_Stage", {

    name: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
});

project_Stage.hasMany(Project_Sub_Stage);

module.exports = project_Stage;
