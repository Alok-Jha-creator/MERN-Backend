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

const SmtpConfig = {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_FORM: process.env.SMTP_FORM
};

module.exports = {
    CloudinaryConfig,
    DbConfig,
    SmtpConfig
}