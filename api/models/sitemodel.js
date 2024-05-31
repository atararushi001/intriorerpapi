const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
// Adjust the path as needed

const Site = sequelize.define(
  "Site",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    package: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    isdeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    deleted_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estimate: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    final_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    site_owner_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    site_head_carpenter_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    site_designer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

module.exports = Site;
