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
     queryInterface.createTable(
      'keahlian',
      {
        keahlian_id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          allowNull: false,
          autoIncrement :true
        },
        nama_keahlian: {
          type: Sequelize.STRING(255),
        }
      },
      {
        timestamps: false,
        schema: 'ref',
        indexes: [
          {
            name: "keahlian_pkey",
            unique: true,
            fields: [
              { name: "keahlian_id" },
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
    await queryInterface.dropTable({tableName: 'keahlian', schema: 'ref'});
  }
};
