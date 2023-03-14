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
      'userdata',
      {
        pasien_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull:true
        },
        email: {
          type: Sequelize.STRING(30),
        },
        no_telp: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        password: {
          type: Sequelize.STRING,
        },
        nik: {
          type: Sequelize.NUMERIC(16),
        },
        namalengkap: {
          type: Sequelize.STRING(50),
        },
        golongandarah: {
          type: Sequelize.STRING,
        },
        tempatlahir: {
          type: Sequelize.STRING,
        },
        tanggallahir: {
          type: Sequelize.DATEONLY,
        },
        alamat: {
          type: Sequelize.STRING,
        },
        rw: {
          type: Sequelize.NUMERIC(5, 0),
        },
        rt: {
          type: Sequelize.NUMERIC(5, 0),
        },
        kodepos: {
          type: Sequelize.NUMERIC,
        },
        kodewilayah: {
          type: Sequelize.STRING(10),
        },
        jeniskelamin: {
          type: Sequelize.STRING,
        },
        pekerjaan: {
          type: Sequelize.STRING,
        },
        profile: {
          type: Sequelize.STRING
        }
      },
      {
        timestamps: false,
        indexes: [
          {
            name: "master_user_pkey",
            unique: true,
            fields: [
              { name: "pasien_id" },
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
    await queryInterface.dropTable('userdata');
  }
};
