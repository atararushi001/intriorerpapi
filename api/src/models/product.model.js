const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");
const Unit = require("./unit.model");

const Product = sequelize.define(
    "product",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        minimum_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            // allowNull: true,
            defaultValue: 0,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hsnCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        timestamps: true,
    },
);

Product.belongsTo(Unit);

module.exports = Product;
