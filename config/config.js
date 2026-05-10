// for migration 
const {DbConfig} = require('../src/config/config');

module.exports = {
    devlopment:{
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
