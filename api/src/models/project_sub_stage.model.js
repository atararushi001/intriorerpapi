const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const project_Stage = require("./project_stage.model");

const Project_Sub_Stage = sequelize.define("Project_Sub_Stage", {
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

module.exports = Project_Sub_Stage;
