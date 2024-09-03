const { DataTypes } = require('sequelize');
const sequelize = require("../config/db.config");
const Product = require('./product.model');

const extraMaterialProduct = sequelize.define('extraMaterialProduct', {
    extraMaterialId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // productId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    // },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

extraMaterialProduct.belongsTo(Product, {
    as: "product",
    foreignKey: "productId",
    allowNull: false,
});

module.exports = extraMaterialProduct;