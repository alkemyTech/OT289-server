'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('Testimonials', [
        {
          name: 'testimonio 1',
          image: 'story-author-01.png',
          content: 'content Testiminonio 1',
          createdAt:new Date,
          updatedAt:new Date
        },
        {
          name: 'testimonio 2',
          image: 'story-author-02.png',
          content: 'content Testiminonio 2',
          createdAt:new Date,
          updatedAt:new Date
        },
        {
          name: 'testimonio 3',
          image: 'story-author-03.png',
          content: 'content Testiminonio 3',
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
