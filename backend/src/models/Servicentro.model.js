// models/servicentro.model.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database.js');

const Servicentro = sequelize.define('Servicentro', {
  id_servicentro: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_servicentro: {
    type: DataTypes.STRING,
    allowNull: false
  },
  valor_combustible: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'servicentros'
});

module.exports = Servicentro;