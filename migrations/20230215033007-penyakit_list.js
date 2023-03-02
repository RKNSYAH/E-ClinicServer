'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('daftar_penyakit', {
      penyakit_id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      nama: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
    }, {
      timestamps: false,
      schema: 'ref',
      indexes: [
        {
          name: "daftar_penyakit_pkey",
          unique: true,
          fields: [
            { name: "penyakit_id" },
          ]
        },
      ]
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable({tableName: 'daftar_penyakit', schema: 'ref'});
  }
};
