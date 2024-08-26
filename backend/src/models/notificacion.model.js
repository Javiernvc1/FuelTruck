const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database.js');

const Notificacion = sequelize.define('Notificacion', {
    mensaje: {
        type: DataTypes.STRING,
        allowNull: false
    },
    leida: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
},{
    tableName: 'notificaciones'
});

module.exports = Notificacion;