const Sequelize = require("sequelize")

module.exports = new Sequelize('users', 'me', 'password', {
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    define: {
        freezeTableName: true
      }
})