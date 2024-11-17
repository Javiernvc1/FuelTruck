'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    
    await queryInterface.changeColumn('viajes', 'empresaId', {
      type: Sequelize.STRING,
      references: {
        model: 'empresas',
        key: 'nombre_empresa'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    
    
    await queryInterface.changeColumn('viajes', 'empresaId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'empresas',
        key: 'id_empresa'
      }
    });
  }
};
