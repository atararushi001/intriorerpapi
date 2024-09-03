const { DataTypes } = require('sequelize');
const sequelize = require("../config/db.config");
const User = require('./user.model');   
const Project = require('./project.model');
const extraMaterialProduct = require('./extraMaterialproduct.model');

const extraMaterial = sequelize.define('extraMaterial', {
    invoiceNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },  
    status: {
        type: DataTypes.ENUM('updated'),
        allowNull: false,
        defaultValue: 'updated',
    },
    // orderBy: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    // },
    // deliveredBy: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    // },
    // dispatchBy: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    // },
});
extraMaterial.belongsTo(Project, {
    as: "projectid",
    foreignKey: "project",
    allowNull: true,
});
extraMaterial.belongsTo(User, {
    as: "extraMaterialbyid",
    foreignKey: "extraMaterialby",
    allowNull: true,
});

extraMaterial.hasMany(extraMaterialProduct, { foreignKey: 'extraMaterialId' });

module.exports = extraMaterial;