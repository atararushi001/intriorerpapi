const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");
const PurchaseOrder = require("./purchaseOrder.model");
const Product = require("./product.model");

const PurchaseOrderDetail = sequelize.define(
    "purchaseOrderDetail",
    {
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        qty: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    },
);

PurchaseOrderDetail.belongsTo(Product);
PurchaseOrder.hasMany(PurchaseOrderDetail);
PurchaseOrderDetail.belongsTo(PurchaseOrder);

module.exports = PurchaseOrderDetail;
