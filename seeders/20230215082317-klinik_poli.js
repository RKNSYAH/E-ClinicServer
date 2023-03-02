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
    await queryInterface.bulkInsert({tableName: 'klinik', schema: 'public'}, [
      {
        klinik_id: 'c1ec8c67-f41d-45dd-93a5-16e506402e89',
        nama_klinik: 'klinik123',
        alamat: 'bandung',
        kode_wilayah: '3200000000',
        rt: '05',
        rw: '05',
        kode_pos: '19512',
        no_kontak: '08123456',
        email: 'mail.com',
        no_wa: '08123456',
        instagram: '@klinik123',
        facebook: '@klinik123',
        twitter: '@klinik123'
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
    await queryInterface.bulkDelete({tableName: 'klinik', schema: 'public'}, null, {});
  }
};
