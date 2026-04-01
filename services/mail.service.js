const nodemailer = require('nodemailer');
const { SmtpConfig } = require('../src/config/config');

class EmailService{
    transport;
    constructor(transport){
        try {
            this.transport = nodemailer.createTransport(
                host: SmtpConfig.SMTP_HOST,
                port: transport.SMTP_PORT,
                

            )
        } catch (error) {
            throw {code:500,error, message:"SMTP Not connected", status:"EMAIL_SERVICE_INIT_ERR"}
        }
    }
}