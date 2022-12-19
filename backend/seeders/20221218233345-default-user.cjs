'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert('users', [{
          name: "Tiago",
          email: "tiago.espanha@gmail.com",
          password: "mudar-pra-hash",
          createdAt: new Date(),
          updatedAt: new Date(),
     }], {});
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('People', null, {});
  }
};
