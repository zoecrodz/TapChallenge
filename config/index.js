const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "postgres://postgres:46471517jaja@localhost:5432/tapchallenge",
  {
    logging: false,
    dialect: "postgres",
  }
);

module.exports = sequelize;