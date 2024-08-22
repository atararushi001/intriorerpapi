const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Project = require("./project.model");
const Project_Stage = require("./project_stage.model");
const Project_Sub_Stage = require("./project_sub_stage.model");

const Task = sequelize.define("Task", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    photos: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Assuming you want to store multiple photo URLs
        allowNull: true,
    },
    status: {
        type: DataTypes.BOOLEAN, // true for complete, false for incomplete
        allowNull: false,
        defaultValue: false,
    },
});

Task.belongsTo(Project, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: 'CASCADE',
});

Task.belongsTo(Project_Stage, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: 'CASCADE',
});

Task.belongsTo(Project_Sub_Stage, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: 'CASCADE',
});

module.exports = Task;  