const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database.js');
const bcrypt = require('bcryptjs');
const Role = require('./role.model');

// Define el modelo 'User'
const User = sequelize.define('User', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rut: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  roleId: {
    type: DataTypes.STRING,
    references: {
      model: Role, // 'Roles' would also work
      key: 'name'
    }
  }
}, {
  tableName: 'users',
  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
    }
  }
});



module.exports = User;