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
    await queryInterface.bulkInsert({tableName: 'user_controls', schema: 'users'}, [{
      id_user: 'c2154e11-572b-44e7-8225-f11e8459756b',
    },
    {
      id_user: 'a8b7f602-df79-45a3-ba99-9647f6a1da7c',
    },
    {
      id_user: '79585d0e-226f-42eb-afaf-9e520cd7c516',
    },
    {
      id_user: 'd12de546-b45e-4a31-994b-99dfc8557a68',
      level: 2
    }
  ], {
  });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete({ tableName: 'user_controls', schema: 'users' }, null, {});
  }
};
