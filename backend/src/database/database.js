const Sequelize = require('sequelize');

const sequelize = new Sequelize('tesis','javier','admin',{
    host: "localhost",
    dialect: "postgres"
});

module.exports = {
  sequelize
};