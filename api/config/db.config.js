const { Client } = require("pg");
const { Sequelize } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected to discover`);
    sequelize
      .sync({ alter: true, logging: false })
      .then(() => {
        console.log("All models were synchronized successfully.");
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = sequelize;
