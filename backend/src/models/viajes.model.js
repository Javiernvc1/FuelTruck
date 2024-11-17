// models/viaje.model.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database.js');
const Empresa = require('./Empresa.model.js');
const User = require('./user.model.js');
const Camion = require('./camion.model.js');
const TipoCarga = require('./tipocarga.model.js');

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
  distancia: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  odometro_inicio: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  odometro_final: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  combustible_inicio: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  combustible_final: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  destino: { // Nueva columna
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: { // Nueva columna
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo_cargaId: {
    type: DataTypes.STRING,
    references: {
      model: TipoCarga,
      key: 'nombre'
    }
  },
  empresaId: {
    type: DataTypes.STRING, // Actualiza el tipo de dato a STRING
    references: {
      model: Empresa,
      key: 'nombre_empresa' // Actualiza la clave a nombre_empresa
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