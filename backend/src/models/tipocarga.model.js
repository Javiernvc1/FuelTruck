const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database.js');
const Viajes = require('./viajes.model.js');

const TipoCarga = sequelize.define('TipoCarga', {
    id_tipo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    }, {
    tableName: 'tipo_carga'
});

module.exports = TipoCarga;
