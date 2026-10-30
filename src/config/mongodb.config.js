const mongoose = require('mongoose');
const { DbConfig } = require('./config');

const mongodbInit = async () => {
    try {
        await mongoose.connect(DbConfig.mongodb.url, {
            autoCreate: true,
            dbName: DbConfig.mongodb.dbName,
            autoIndex: true,

        });
        console.log('MongoDB Connected successfully');
    } catch (exception) {
        console.error('Error connecting to MongoDB:', exception);
        throw{code:500,message:'Error connecting to MongoDB',status:"MONGODB_CONNECTION_ERROR"}
        
    }
};

module.exports = { mongodbInit };