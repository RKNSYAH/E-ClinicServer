'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert({tableName: 'klinik_poliklinik', schema: 'ref'}, [
      {
        klinik_id: 'c1ec8c67-f41d-45dd-93a5-16e506402e89',
        poliklinik_id: '1'
      },
      {
        klinik_id: 'c1ec8c67-f41d-45dd-93a5-16e506402e89',
        poliklinik_id: '2'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete({tableName: 'klinik_poliklinik', schema: 'ref'}, null, {});
  }
};
