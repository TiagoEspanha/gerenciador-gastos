'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('expenses', 'categoryId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'categories',
        key: 'id',
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('expenses', 'categoryId');
  }
};
