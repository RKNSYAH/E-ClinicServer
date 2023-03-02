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
      'klinik',
      {
        klinik_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        nama_klinik: {
          type: Sequelize.STRING(100),
        },
        alamat: {
          type: Sequelize.TEXT
        },
        kode_wilayah: {
          type: Sequelize.STRING(10),
        },
        rt: {
          type: Sequelize.NUMERIC(5, 0),
        },
        rw: {
          type: Sequelize.NUMERIC(5, 0),
        },
        kode_pos: {
          type: Sequelize.NUMERIC(5, 0)
        },
        no_kontak: {
          type: Sequelize.STRING(20),
        },
        email: {
          type: Sequelize.STRING(30)
        },
        no_wa: {
          type: Sequelize.STRING(50),
          allowNull: true
        },
        instagram: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        twitter: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        facebook: {
          type: Sequelize.TEXT,
          allowNull: true
        },
      },
      {
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: "klinik_pkey",
            unique: true,
            fields: [
              { name: "klinik_id" },
            ]
          },
          {
            name: "email_klinik_ukey",
            unique: true,
            fields: [
              { name: "email" },
            ]
          },
        ]
  
      },
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('klinik');
  }
};
