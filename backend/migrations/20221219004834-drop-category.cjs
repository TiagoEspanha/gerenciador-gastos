'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('expenses', 'category')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('expenses', 'category', {
      category: {
        type: Sequelize.STRING
      },
    })
  }
};
