const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Payment = sequelize.define(
  "Payment",
  {
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    siteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    currentPayAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    leftAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Payment;
