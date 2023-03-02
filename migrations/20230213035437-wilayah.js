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
      'master_wilayah',
      {
        wilayah_id: {
          autoIncrement: true,
          type: Sequelize.BIGINT,
          allowNull: false,
          primaryKey: true
        },
        kode_wilayah: {
          type: Sequelize.STRING(255),
          allowNull: true
        },
        nama: {
          type: Sequelize.STRING(255),
          allowNull: true
        },
        id_level_wilayah: {
          type: Sequelize.BIGINT,
          allowNull: true
        },
        latitude: {
          type: Sequelize.DOUBLE,
          allowNull: true
        },
        longitude: {
          type: Sequelize.DOUBLE,
          allowNull: true
        },
        kode_kcd: {
          type: Sequelize.STRING(255),
          allowNull: true
        },
        kode_kcd_romawi: {
          type: Sequelize.STRING(255),
          allowNull: true
        },  
      },
      {
        timestamps: false,
        schema: 'ref',
        indexes: [
          {
            name: "master_wilayah_pkey",
            unique: true,
            fields: [
              { name: "wilayah_id" },
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
    await queryInterface.dropTable({ tableName: 'master_wilayah', schema: 'ref' }, null, {});

  }
};
