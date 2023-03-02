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
    'klinik_poliklinik',{
      poliklinik_id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model : {tableName: 'poliklinik', schema: 'ref'},
          key: 'poliklinik_id'
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
