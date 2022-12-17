'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('expenses', 'userId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('expenses', 'userId');
  }
};
