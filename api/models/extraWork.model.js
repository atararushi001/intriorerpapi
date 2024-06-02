const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Project = require("./project.model");

/*

 -- make association with Project and give correct field name for ProjectId
 -- Also make change in extra work controller after making the association

*/

const ExtraWork = sequelize.define(
  "extraWork",
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
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: Project,
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// Define association
// ExtraWork.belongsTo(Project, { foreignKey: "projectId" });

module.exports = ExtraWork;
