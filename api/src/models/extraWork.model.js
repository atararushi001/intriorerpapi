const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");
const Project = require("./project.model");

const ExtraWork = sequelize.define(
    "extraWork",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Height: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Width: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sqft: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // projectId: {
        //   type: DataTypes.INTEGER,
        //   references: {
        //     model: Project,
        //     key: "id",
        //   },
        //   allowNull: false,
        // },
    },
    {
        timestamps: true,
    },
);
// ExtraWork.belongsTo(Project, {
//     as: "projectid",
//     foreignKey: "project",
//     allowNull: true,
// });
module.exports = ExtraWork;
