'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('empresas', 'nombre_empresa', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true // Añadir la restricción unique
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('empresas', 'nombre_empresa', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false // Eliminar la restricción unique en caso de rollback
    });
  }
};
