const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [10, 15], // Adjust length based on your requirements
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("Admin", "Client", "Carpenter", "Partner"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

User.belongsTo(Cities);

module.exports = User;
