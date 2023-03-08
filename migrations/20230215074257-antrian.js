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
    await queryInterface.createTable('antrian', {
      antrian_id: {
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
      pasien_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: { tableName: 'userdata', schema: 'public' },
          key: 'pasien_id'
        }
      },
      klinik_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model : {tableName: 'klinik', schema: 'public'},
          key: 'klinik_id'
        }
      },
      waktu_antrian: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn('now')
      },
    }, {
      tableName: 'antrian',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: "antrian_pkey",
          unique: true,
          fields: [
            { name: "antrian_id" },
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
    await queryInterface.dropTable({ tableName: 'antrian', schema: 'public' });
  }
};
