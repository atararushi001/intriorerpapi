const { DataTypes } = require("sequelize");
const User = require("./user.model");
const Package = require("./package.model");
const sequelize = require("../config/db.config");
const ExtraWork = require("./extraWork.model");

const Project = sequelize.define(
    "Project",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        total_amount: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        currently_paid_amount: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        left_amount: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0.0,
        },
        location_auto: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        location_manual: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        // extra_work_id: {
        //   type: DataTypes.INTEGER,
        //   references: {
        //     model: ExtraWork,
        //     key: "id",
        //   },
        //   allowNull: true,
        // },
        // package_id: {
        //   type: DataTypes.INTEGER,
        //   references: {
        //     model: Package,
        //     key: "id",
        //   },
        //   allowNull: false,
        // },
        // location_id: {
        //   type: DataTypes.INTEGER,
        //   references: {
        //     model: Location,
        //     key: "id",
        //   },
        //   allowNull: false,
        // },
        // client_id: {
        //   type: DataTypes.INTEGER,
        //   references: {
        //     model: User,
        //     key: "id",
        //   },
        //   allowNull: true,
        // },
        // designer_id: {
        //   type: DataTypes.INTEGER,
        //   references: {
        //     model: User,
        //     key: "id",
        //   },
        //   allowNull: true,
        // },
        // head_carpenter_id: {
        //   type: DataTypes.INTEGER,
        //   references: {
        //     model: User,
        //     key: "id",
        //   },
        //   allowNull: true,
        // },
        // created_by: {
        //   type: DataTypes.INTEGER,
        //   references: {
        //     model: User,
        //     key: "id",
        //   },
        //   allowNull: true,
        // },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Pending",
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        timestamps: true,
    },
);

// Define associations
// Project.belongsTo(Package, { foreignKey: "package_id" });
// Project.belongsTo(Location, { foreignKey: "location_id" });
Project.hasMany(ExtraWork);
ExtraWork.belongsTo(Project);


User.hasMany(Project, { foreignKey: "client_id" });

// Project.belongsTo(User, {
//     as: "Location",
//     foreignKey: "location_id",
//     allowNull: true,
// });

Project.belongsTo(User, {
    as: "Client",
    foreignKey: "client_id",
    allowNull: true,
});
Project.belongsTo(Package, {
    as: "Package",
    foreignKey: "packageId",
    allowNull: true,
});

Project.belongsTo(User, {
    as: "Designer",
    foreignKey: "designer_id",
    allowNull: true,
});
Project.belongsTo(User, {
    as: "HeadCarpenter",
    foreignKey: "head_carpenter_id",
    allowNull: true,
});
Project.belongsTo(User, {
    as: "CreadtedBy",
    foreignKey: "created_by_id",
    allowNull: true,
});

module.exports = Project;
