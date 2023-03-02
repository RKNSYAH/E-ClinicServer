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
    await queryInterface.bulkInsert({tableName: 'golongan_darah', schema: 'public'}, [
      {

        nama: 'A'
      },
      {
        nama: 'B'
      },
      {

        nama: 'O'
      },
      {
        nama: 'AB'
      },
      {

        nama: 'A-'
      },
      {
        nama: 'B-'
      },
      {

        nama: 'O-'
      },
      {
        nama: 'AB-'
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
    await queryInterface.bulkDelete({tableName: 'golongan_darah', schema: 'public'}, null, {});
  }
};
