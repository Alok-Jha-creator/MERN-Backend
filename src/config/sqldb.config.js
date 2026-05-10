const Sequelize = require("sequelize");
const { DbConfig } = require("./config");



const sequelize = new Sequelize(DbConfig.postgres.url, {
    dialect: 'postgres',              // Pgsql ==> postgres, mysql ==> mysql, sqlite ==> sqlite, 
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false, // Disable logging; default: console.log
})

module.exports = {sequelize}