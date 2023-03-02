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
      'dokter',
      {
        dokter_id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        nik: {
          type: Sequelize.STRING(16),
        },
        nama_dokter: {
          type: Sequelize.STRING(50),
        },
        jenis_kelamin: {
          type: Sequelize.STRING(1),
        },
        keahlian_id: {
          type: Sequelize.BIGINT,
          references: {
            model: {tableName: 'keahlian', schema: 'ref'},
            key: 'keahlian_id'
          }
  
        },
      },
      {
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: "dokter_pkey",
            unique: true,
            fields: [
              { name: "dokter_id" },
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
    await queryInterface.dropTable({ tableName: 'dokter', schema: 'public' }, null, {});

  }
};
