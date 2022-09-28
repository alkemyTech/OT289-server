'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Entries', [
      {
        name: 'Entry Test Name',
        content: 'Entry Content Test',
        image: 'Entry Image Name.jpg Not Real',
        categoryId: 1,
        type: 'Entry Type Test Text',
        createdAt: new Date,
        updatedAt: new Date
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
