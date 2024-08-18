const { DataTypes } = require('sequelize');
const sequelize = require("../config/db.config");

const OrderProduct = sequelize.define('OrderProduct', {
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = OrderProduct;