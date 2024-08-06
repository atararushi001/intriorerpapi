const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Project = require("./project.model");
const Project_Sub_Stage = require("./project_sub_stage.model");

const project_Stage = sequelize.define("project_Stage", {
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
Project_Sub_Stage.belongsTo(project_Stage, {
    foreignKey: "Stage_id",
    allowNull: true,
});

project_Stage.hasMany(Project_Sub_Stage);
module.exports = project_Stage;
