'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    
      await queryInterface.bulkInsert('Activities', [
        {
          name: 'Actividad 1',
          image: 'journal-01.jpg',
          content: 'content 1',
          createdAt:new Date,
          updatedAt:new Date
        },
        {
          name: 'Actividad 2',
          image: 'journal-02.jpg',
          content: 'content 2',
          createdAt:new Date,
          updatedAt:new Date
        },
        {
          name: 'Actividad 3',
          image: 'journal-03.jpg',
          content: 'content 3',
          createdAt:new Date,
          updatedAt:new Date
          
        }
      
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
