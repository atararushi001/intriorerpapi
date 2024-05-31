const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Project = require("./project.model");

const Design = sequelize.define(
  "Design",
  {
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Project,
        key: "id",
      },
      allowNull: false,
    },
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
  }
);

// Define associations
Design.belongsTo(Project, { foreignKey: "project_id" });

module.exports = Design;
