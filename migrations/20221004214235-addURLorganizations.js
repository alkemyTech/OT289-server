'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Organizations', 'Instagram', {
      type: Sequelize.DataTypes.STRING
    })
    await queryInterface.addColumn('Organizations', 'Facebook', {
      type: Sequelize.DataTypes.STRING
    })
    await queryInterface.addColumn('Organizations', 'Linkedin', {
      type: Sequelize.DataTypes.STRING
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
