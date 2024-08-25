const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const project_Stage = require("./project_stage.model");
const Task = require("./task.model");

const Project_Sub_Stage = sequelize.define("Project_Sub_Stage", {

    name: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
});
Project_Sub_Stage.hasMany(Task, { foreignKey: 'ProjectSubStageId', as: 'Tasks' });
module.exports = Project_Sub_Stage;
