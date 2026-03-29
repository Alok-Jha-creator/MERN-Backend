const { mongo } = require('mongoose');

require('dotenv').config();

const CloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET
};

const DbConfig = {
    mongodb: {
        url: process.env.MONGODB_URL,
        dbName: process.env.MONGODB_DB, 
    },
};

module.exports = {
    CloudinaryConfig,
    DbConfig
}