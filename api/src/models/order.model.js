const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");
const Product = require("./product.model");
const User = require("./user.model");

const Order = sequelize.define(
    "order",
    {
        qty: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    },
);

Order.belongsTo(Product);
Order.belongsTo(User, { as: "orderBy" });
Order.belongsTo(User, { as: "deliveredBy" });
Order.belongsTo(User, { as: "dispatchBy" });

module.exports = Order;