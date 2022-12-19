'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        name: "Lazer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mercado",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Farmarcia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Casa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Outros",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
