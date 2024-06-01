const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Cities = require("./citiesModel");

/*

 -- make association with city and give correct field name for city Id

*/

const User = sequelize.define(
  "User",
  {
    name: {
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
      unique: true,
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
    profilePhoto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM(
        "Admin",
        "Client",
        "Head Carpenter",
        "Partner",
        "Designer",
        "Worker"
      ),
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

User.belongsTo(Cities);

module.exports = User;
