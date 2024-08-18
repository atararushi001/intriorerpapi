const { DataTypes } = require('sequelize');
const sequelize = require("../config/db.config");
const User = require('./user.model');
const Product = require('./product.model');
const OrderProduct = require('./orderproduct.model');

const Order = sequelize.define('Order', {
    invoiceNumber: {
        type: DataTypes.STRING,
        allowNull: false,
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
Order.belongsTo(User, {
    as: "orderByid",
    foreignKey: "orderBy",
    allowNull: true,
});
Order.belongsTo(User, {
    as: "deliveredByid",
    foreignKey: "deliveredBy",
    allowNull: true,
});
Order.belongsTo(User, {
    as: "dispatchByid",
    foreignKey: "dispatchBy",
    allowNull: true,
});

module.exports = Order;