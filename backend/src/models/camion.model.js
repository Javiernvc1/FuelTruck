// models/camion.model.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database.js');
const User = require('./user.model.js');

const Camion = sequelize.define('Camion', {
  patente: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gasto_medio: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  userId: {
    type: DataTypes.STRING,
    references: {
      model: User, // 'Users' would also work
      key: 'rut'
    }
  }
}, {
  tableName: 'camiones'
});


module.exports = Camion;