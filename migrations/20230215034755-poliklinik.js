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
      'poliklinik',{
        poliklinik_id : {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        nama: {
          type: Sequelize.STRING,
          allowNull: false,
        }
      },
      {
        schema: 'ref',
        timestamps: false,
        indexes: [
          {
            name: "poliklinik_pkey",
            unique: true,
            fields: [
              { name: "poliklinik_id" },
            ]
          },
        ] 
      }
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable({ tableName: 'poliklinik', schema: 'ref' }, null, {});
  }
};
