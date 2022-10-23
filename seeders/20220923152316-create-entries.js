'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Entries', [
      {
        name: 'Novedad',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mauris metus, pharetra nec mauris sed, porta lobortis leo. Ut id tempus magna. Maecenas mi odio, eleifend eu tincidunt in, ullamcorper eget libero. Fusce sed sodales lacus. Vivamus vel risus quam. Pellentesque in pharetra arcu. In ex lectus, blandit ac aliquam.',
        image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
        categoryId: 1,
        type: 'news',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        name: 'Novedad',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mauris metus, pharetra nec mauris sed, porta lobortis leo. Ut id tempus magna. Maecenas mi odio, eleifend eu tincidunt in, ullamcorper eget libero. Fusce sed sodales lacus. Vivamus vel risus quam. Pellentesque in pharetra arcu. In ex lectus, blandit ac aliquam.',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=932&q=80',
        categoryId: 1,
        type: 'news',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        name: 'Novedad',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mauris metus, pharetra nec mauris sed, porta lobortis leo. Ut id tempus magna. Maecenas mi odio, eleifend eu tincidunt in, ullamcorper eget libero. Fusce sed sodales lacus. Vivamus vel risus quam. Pellentesque in pharetra arcu. In ex lectus, blandit ac aliquam.',
        image: 'https://images.unsplash.com/photo-1581726707445-75cbe4efc586?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
        categoryId: 1,
        type: 'news',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        name: 'Novedad',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mauris metus, pharetra nec mauris sed, porta lobortis leo. Ut id tempus magna. Maecenas mi odio, eleifend eu tincidunt in, ullamcorper eget libero. Fusce sed sodales lacus. Vivamus vel risus quam. Pellentesque in pharetra arcu. In ex lectus, blandit ac aliquam.',
        image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
        categoryId: 1,
        type: 'news',
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
