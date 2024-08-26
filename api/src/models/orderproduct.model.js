const { DataTypes } = require('sequelize');
const sequelize = require("../config/db.config");
const Product = require('./product.model');

const OrderProduct = sequelize.define('OrderProduct', {
    orderId: {
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

OrderProduct.belongsTo(Product, {
    as: "productId",
    foreignKey: "product",
    allowNull: true,
});

module.exports = OrderProduct;