const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const States = require("./states.model");
const Cities = require("./cities.model");

const Countries = sequelize.define("countries", {
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

Countries.hasMany(States);
States.belongsTo(Countries);
States.hasMany(Cities);
Cities.belongsTo(States);

module.exports = Countries;