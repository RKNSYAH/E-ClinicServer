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
    await queryInterface.createTable({tableName: 'user_controls', schema: 'users'}, {
      id_user: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: 'userdata',
            schema: 'public',
          },
          key: 'pasien_id'
        }
      },
      is_login: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      last_login: {
        type: Sequelize.DATE,
        allowNull: true
      },
      last_logout: {
        type: Sequelize.DATE,
        allowNull: true
      },
      jwt_token: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true
      },
      device: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1
      }
    }, {
      tableName: 'user_controls',
      schema: 'users',
      timestamps: false,
      indexes: [
        {
          name: "user_controls_pkey",
          unique: true,
          fields: [
            { name: "id_user" },
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
    await queryInterface.dropTable({tableName: 'user_controls', schema: 'users'});
  }
};
