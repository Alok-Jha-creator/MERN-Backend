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

    async sendEmail({to, subject, text=null, html, cc=null, bcc=null, attachments=null,message}){

        try 
        {
        let messageBody={
            from: SmtpConfig.smtpForm,
            to:to,
            subject:subject,
           //  text:"",
             html:"",
            // cc:"",
            // bcc:"",
            // attachments:""
        };
        if(message) messageBody.html = message;
        if(text) messageBody.text=text;
        if(html) messageBody.html=html;
        if(cc) messageBody.cc=cc;
        if(bcc) messageBody.bcc=bcc;
        if(attachments) messageBody.attachments=attachments;
            await this.#transport.sendMail(messageBody)
        } catch (error) {
            throw {code:500,error, message:"Failed to send email", status:"EMAIL_SEND_ERR"}
        }
    }
}


module.exports=EmailService;