'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SlideImages', {      
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        imageUrl: {
            type: dataTypes.STRING,
            allowNull: false
        },
        text: {
            type: dataTypes.STRING,
            allowNull: false
        },
        order: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        organizationId: {
            type: dataTypes.INTEGER,
        },
        deletedAt: {
            type: dataTypes.DATE
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    })
},
down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SlideImages');
  }
}