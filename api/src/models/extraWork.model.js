const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");

const ExtraWork = sequelize.define(
    "extraWork",
    {
        name: {
            type: DataTypes.STRING,
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

module.exports = ExtraWork;
