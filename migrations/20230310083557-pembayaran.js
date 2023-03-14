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
    await queryInterface.createTable('pembayaran', {
      pembayaran_id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      pendaftaran_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: { tableName: 'pendaftaran', schema: 'public' },
          key: 'pendaftaran_id'
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
      tableName: 'pembayaran',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: "pembayaran_pkey",
          unique: true,
          fields: [
            { name: "pembayaran_id" },
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
    await queryInterface.dropTable({ tableName: 'pembayaran', schema: 'public' });
  }
};
