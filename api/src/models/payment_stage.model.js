const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const PaymentStage = sequelize.define(
    "PaymentStage",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = PaymentStage;
