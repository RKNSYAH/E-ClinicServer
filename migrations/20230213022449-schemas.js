'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'),
        queryInterface.createSchema('ref', { transaction: t }),
        queryInterface.createSchema('users', { transaction: t })
      ]);
    });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return await queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.dropSchema('ref', { transaction: t }),
        queryInterface.dropSchema('users', { transaction: t })
      ]);
    });

  }
};
