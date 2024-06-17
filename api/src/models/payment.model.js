const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Project = require("./project.model");
const User = require("./usermodel");

const Payment = sequelize.define(
    "Payment",
    {
        project_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Project,
                key: "id",
            },
            allowNull: false,
        },
        client_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: "id",
            },
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        payment_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        payment_method: {
            type: DataTypes.STRING,
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

// Define associations
Payment.belongsTo(Project, { foreignKey: "project_id" });
Payment.belongsTo(User, { foreignKey: "client_id" });

module.exports = Payment;
