const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database.js');

const Region = sequelize.define('Region', {
  id_region:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  

}, {
  tableName: 'regiones'
});

module.exports = Region;