const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Design = require("./design.model");
const User = require("./usermodel");

const DesignApproval = sequelize.define(
    "DesignApproval",
    {
        design_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Design,
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
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        feedback: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        timestamps: true,
    },
);

// Define associations
DesignApproval.belongsTo(Design, { foreignKey: "design_id" });
DesignApproval.belongsTo(User, { foreignKey: "client_id" });

module.exports = DesignApproval;
