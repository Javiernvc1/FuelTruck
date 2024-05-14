// models/ciudad.model.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database.js');
const Region = require('./region.model.js');
const Ciudad = sequelize.define('Ciudad', {
  id_ciudad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  regionId: {
    type: DataTypes.INTEGER,
    references: {
      model: Region,
      key: 'id_region'
    }
  }
}, {
  tableName: 'ciudades'
});

module.exports = Ciudad;