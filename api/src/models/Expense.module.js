const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Project = require("./project.model");
const User = require("./user.model");
const Expense = sequelize.define("Expense", {   
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    billphoto: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    
});
Expense.belongsTo(User, {   
    as: "createdByid",
    foreignKey: "createdBy",
    allowNull: true,
});

Expense.belongsTo(Project, {
    as: "projectid",
    foreignKey: "project",
    allowNull: true,
});
module.exports = Expense;
