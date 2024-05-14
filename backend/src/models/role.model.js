const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database.js'); // Importa la instancia de Sequelize

// Asegúrate de que la ruta es correcta

const Role = sequelize.define('Role', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'roles'
});



module.exports = Role;