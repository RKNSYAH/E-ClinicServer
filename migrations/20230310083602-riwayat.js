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
    await queryInterface.createTable('riwayat', {
      riwayat_id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      pasien_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: { tableName: 'userdata', schema: 'public' },
          key: 'pasien_id',
        }
      },
      diagnosa_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: { tableName: 'diagnosa', schema: 'public' },
          key: 'diagnosa_id'
        }
      },
      jumlah_rp: {
        type: Sequelize.DECIMAL(16, 15),
        allowNull: true
      },
    }, {
      tableName: 'riwayat',
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
    await queryInterface.dropTable({ tableName: 'riwayat', schema: 'public' });
  }
};
