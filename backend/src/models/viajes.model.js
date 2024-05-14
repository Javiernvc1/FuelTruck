// models/viaje.model.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database.js');
const Empresa = require('./Empresa.model.js');
const User = require('./user.model.js');
const Camion = require('./camion.model.js');


const Viaje = sequelize.define('Viaje', {
  id_viaje: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  tipo_carga: {
    type: DataTypes.STRING,
    allowNull: false
  },
  distancia: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  combustible_inicio: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  combustible_final: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  empresaId: {
    type: DataTypes.INTEGER,
    references: {
      model: Empresa,
      key: 'id_empresa'
    }
  },
  userId: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'rut'
    }
  },
  camionId: {
    type: DataTypes.STRING,
    references: {
      model: Camion,
      key: 'patente'
    }
  }
}, {
  tableName: 'viajes'
});

module.exports = Viaje;