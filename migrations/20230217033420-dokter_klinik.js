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
    await queryInterface.createTable(
      'dokter_klinik',{
        dokter_id : {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
          references: {
            model : {tableName: 'dokter', schema: 'public'},
            key: 'dokter_id'
          }
        },
        klinik_id : {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
          references: {
            model : {tableName: 'klinik', schema: 'public'},
            key: 'klinik_id'
          }
        },
      },
      {
        schema: 'ref',
        timestamps: false
      }
      )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
