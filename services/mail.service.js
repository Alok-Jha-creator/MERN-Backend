const nodemailer = require('nodemailer');
const { SmtpConfig } = require('../src/config/config');


// yo transport vanne varable antata katai pani use hudaina so yo class ma transport vanne variable lai private banayeko ho # use garera 
class EmailService{
    #transport;
    constructor(transport){
        try {
            this.#transport = nodemailer.createTransport({
                host: SmtpConfig.smtpHost,
                port: SmtpConfig.smtpPort,
                service: SmtpConfig.smtpService,
                auth: {
                    user: SmtpConfig.smtpUser,
                    pass: SmtpConfig.smtpPassword
                }
                
        })
        console.log("****** SMTP Connected ******")
        } catch (error) {
            throw {code:500,error, message:"SMTP Not connected", status:"EMAIL_SERVICE_INIT_ERR"}
        }
    }
}