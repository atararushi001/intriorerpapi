const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const User = require("./user.model");
const Product = require("./product.model");
const OrderProduct = require("./orderproduct.model");
const Project = require("./project.model");

const Order = sequelize.define("Order", {
    invoiceNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("pending", "dispatched", "delivered"),
        allowNull: false,
        defaultValue: "pending",
    },
    deliveryphoto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deliverylocation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deliverydate: {
        type: DataTypes.DATE,
    },
    dispatchdate: {
        type: DataTypes.DATE,
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
Order.belongsTo(Project, {
    as: "projectid",
    foreignKey: "project",
    allowNull: true,
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
Order.hasMany(OrderProduct, { foreignKey: "orderId" });

module.exports = Order;
