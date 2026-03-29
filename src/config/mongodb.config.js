const mongoose = require('mongoose');
const { DbConfig } = require('./config');

const mongodbInit = async () => {
    try {
        await mongoose.connect(DbConfig.mongodb.url, {
            autoCreate: true,
            dbName: DbConfig.mongodb.dbName,
            autoIndex: true,

        });
        console.log('Connected to MongoDB successfully');
    } catch (exception) {
        throw{code:500,message:'Error connecting to MongoDB',status:"MONGODB_CONNECTION_ERROR"}
        
    }
};

module.exports = { mongodbInit };