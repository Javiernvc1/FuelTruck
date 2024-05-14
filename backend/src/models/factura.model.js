const { DataTypes} = require('sequelize');
const { sequelize } = require('../database/database.js');
const Camion = require('./camion.model');
const User = require('./user.model');
const Servicentro = require('./Servicentro.model');


const Factura = sequelize.define('Factura', {
    id_factura: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    monto: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    litros: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    camionId: {
         type: DataTypes.STRING,
         references: {
             model: Camion,
             key: 'patente'
      }
    },
    userId: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'rut'
        }
    },
    servicentroId: {
        type: DataTypes.INTEGER,
        references: {
            model: Servicentro,
            key: 'id_servicentro'
        }
    }
}, {
    tableName: 'facturas'
});

module.exports = Factura;