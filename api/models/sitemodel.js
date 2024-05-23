const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

'use strict';


const Sites = sequelize.define("Sites", {
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: true
    },
    package: {
        type: DataTypes.STRING,
        allowNull: true
    },
    designer: {
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
    isactive: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isactive: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isdeleted: {
        type: DataTypes.STRING,
        allowNull: true
    }, 
    deleted_by: {
        type: DataTypes.STRING,
        allowNull: true
    },
    deleted_at: {
        type: DataTypes.STRING,
        allowNull: true
    },

}, {
    timestamps: true
});



module.exports = Sites;
