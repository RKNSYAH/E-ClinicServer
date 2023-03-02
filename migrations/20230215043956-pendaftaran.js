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
    await queryInterface.createTable('pendaftaran', {
      pendaftaran_id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      pasien_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: { tableName: 'userdata', schema: 'public' },
          key: 'pasen_id'
        }
      },
      dokter_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: { tableName: 'dokter', schema: 'public' },
          key: 'dokter_id'
        }
      },
      klinik_id : {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model : {tableName: 'klinik', schema: 'public'},
          key: 'klinik_id'
        }
      },
      tanggal_pendaftaran: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.fn('now'),
      },
      nomor_pendaftaran: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
    }, {
      tableName: 'pendaftaran',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: "pendaftaran_pkey",
          unique: true,
          fields: [
            { name: "pendaftaran_id" },
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
    await queryInterface.dropTable({ tableName: 'pendaftaran', schema: 'public' });
  }
};
