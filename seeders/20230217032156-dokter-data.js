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
    await queryInterface.bulkInsert({tableName: 'dokter', schema: 'public'}, [
      {
      dokter_id: 'b57ca085-5e35-4628-b04c-28da82c4f96a',
      nik: '327001',
      nama_dokter: 'Dr. ABC',
      jenis_kelamin: 'L',
      keahlian_id: '1',
    },
    {
      dokter_id: '7946daf6-f565-4abb-bb1d-2a04cecb2c47',
      nik: '327002',
      nama_dokter: 'Dr. DEF',
      jenis_kelamin: 'P',
      keahlian_id: '2',
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
