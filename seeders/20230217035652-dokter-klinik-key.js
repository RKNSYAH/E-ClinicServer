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
    await queryInterface.bulkInsert({tableName: 'dokter_klinik', schema: 'ref'}, [
      {
        dokter_id: 'b57ca085-5e35-4628-b04c-28da82c4f96a',
        klinik_id: 'c1ec8c67-f41d-45dd-93a5-16e506402e89'
      },
      {
        dokter_id: '7946daf6-f565-4abb-bb1d-2a04cecb2c47',
        klinik_id: 'c1ec8c67-f41d-45dd-93a5-16e506402e89'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete({tableName: 'dokter', schema: 'public'}, null, {});
  }
};
