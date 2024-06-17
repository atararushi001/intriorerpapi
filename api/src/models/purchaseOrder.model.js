const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");
const User = require("./user.model");
const Project = require("./project.model");

const PurchaseOrder = sequelize.define(
    "purchaseOrder",
    {
        orderNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        orderedDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        approxDeliveryDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
    },
    {
        timestamps: true,
    },
);

PurchaseOrder.belongsTo(Project);
PurchaseOrder.belongsTo(User, { as: "orderedBy" });
PurchaseOrder.belongsTo(User, { as: "deliveredBy" });
PurchaseOrder.belongsTo(User, { as: "dispatchBy" });

module.exports = PurchaseOrder;
