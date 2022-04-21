const Sequelize = require("sequelize");
require('dotenv').config()

const sequelize = new Sequelize(
  `postgres://postgres:${process.env.PASSWORD}@localhost:5432/tapchallenge`,
  {
    logging: false,
    dialect: "postgres",
  }
);

module.exports = sequelize;