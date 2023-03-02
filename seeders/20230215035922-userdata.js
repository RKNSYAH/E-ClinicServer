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
    await queryInterface.bulkInsert('userdata', [{
      pasen_id: 'c2154e11-572b-44e7-8225-f11e8459756b',
      nik: '1077',
      password: "$2a$12$j0dn/pa6mdXRZzEJIMfnl.6ohOHPzoB8aZ04J9fZ4SL2sRDsEez0C",
      email: "udin@gmail.com",
      namalengkap: "Udin"
    },
    {
      pasen_id: 'a8b7f602-df79-45a3-ba99-9647f6a1da7c',
      nik: '564',
      password: "$2a$12$9/x8L5KHWbJ2BFYOXKYzq.bLcKVBfQ2miDff4K.QiyHP5sf7HIyjG",
      email: "Manusiakocak430@gmail.com",
      namalengkap: "RakhansyahL",
    },
    {
      pasen_id: '79585d0e-226f-42eb-afaf-9e520cd7c516',
      nik: '1078',
      password: "$2a$12$YaimKx39egKi.x8tNSbSNej3mlZ6ls8byi6/QxMM92lNiNMtd/4XC",
      email: "Vicky@gmail.com",
      namalengkap: "Vicky",
    }
  ], {
    schema: 'public'
  });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete({ tableName: 'userdata', schema: 'public' }, null, {});
  }
};
