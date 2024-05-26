const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

'use strict';


const users = sequelize.define("user", {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Country: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Role: {
      type: DataTypes.STRING,
      allowNull: true
  },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    profilePhoto: {
        type: DataTypes.STRING,
        allowNull: true,
      },

}, {
    timestamps: true
});



module.exports = users;
