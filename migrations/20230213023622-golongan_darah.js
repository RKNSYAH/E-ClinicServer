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
      'golongan_darah',
      {
        golongan_darah_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement :true
        },
        nama: {
          type: Sequelize.STRING(10),
        }
      },
      {
        schema: 'ref',
        timestamps: false,
        indexes: [
          {
            name: "golongan_darah_pkey",
            unique: true,
            fields: [
              { name: "golongan_darah_id" },
            ]
          },
        ]
  
      },
      )

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable({tableName: 'golongan_darah', schema: 'ref'});

  }
};
