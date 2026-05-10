// for migration 
const {DbConfig} = require('../src/config/config');

module.exports = {
    development:{
        url: DbConfig.postgres.url,
        dialect: 'postgres',              // Pgsql ==> postgres, mysql ==> mysql, sqlite ==> sqlite, 
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
    },
    // testing:(),
    production:{
        url: DbConfig.postgres.url,
        dialect: 'postgres',              // Pgsql ==> postgres, mysql ==> mysql, sqlite ==> sqlite, 
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
    }
}
