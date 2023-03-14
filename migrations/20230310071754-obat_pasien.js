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
    await queryInterface.createTable('obat_pasien', {
      diagnosa_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: { tableName: 'diagnosa', schema: 'public'},
          key: 'diagnosa_id'
        }
      },
      obat_nama: {
        type: Sequelize.STRING
      },
      jumlah: {
        type: Sequelize.INTEGER
      }
    }, {
      tableName: 'obat_pasien',
      schema: 'public',
      timestamps: false,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable({ tableName: 'obat_pasien', schema: 'public' });
  }
};
