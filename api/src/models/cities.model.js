const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Cities = sequelize.define("cities", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
});

module.exports = Cities;
