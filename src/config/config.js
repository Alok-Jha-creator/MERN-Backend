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
    smtpService: process.env.SMTP_PROVIDER ?? 'gmail',
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPassword: process.env.SMTP_PASSWORD,
    smtpForm: process.env.SMTP_FORM
};

module.exports = {
    CloudinaryConfig,
    DbConfig,
    SmtpConfig
}