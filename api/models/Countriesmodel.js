// File: models/CountryModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

'use strict';

const countries = sequelize.define("countries", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    shortname: {
        type: DataTypes.STRING(3),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    phonecode: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = countries;