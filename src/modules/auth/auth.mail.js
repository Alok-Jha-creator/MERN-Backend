const EmailService = require("../../../services/mail.service");
const { AppConfig } = require("../../config/config");

class AuthEmailService extends EmailService{
   

    async notifyToActivateUserAccount(user){
        try {
            let activationLink= AppConfig.frontendUrl+"verify/"+user.activationToken;
            return this.sendEmail({
                to:user.email,
                subject:"Activate your account",
                message: `<!doctype html>
            <html>
                <head>
                    <meta charset="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                </head>
                <body style="margin:0;padding:0;font-family:Arial, Helvetica, sans-serif;background:#f6f9fb;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;min-width:100%;">
                        <tr>
                            <td align="center" style="padding:24px;">
                                <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="width:100%;max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;">
                                    <tr>
                                        <td style="background:#008080;padding:28px 24px;color:#ffffff;text-align:left;">
                                            <h1 style="margin:0;font-size:22px;line-height:1.2;">Welcome to Our App</h1>
                                            <p style="margin:6px 0 0;font-size:14px;opacity:0.95;">We're glad you're here — let's get your account activated.</p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding:28px 24px;color:#0b1820;font-size:16px;line-height:1.5;">
                                            <p style="width:100%;margin:0 0 12px;">Hello,</p>

                                            <p style="width:100%;margin:0 0 18px;">
                                                Thanks for signing up. To complete your registration and activate your account, please click the button below.
                                            </p>

                                            <p style="text-align:center;margin:18px 0;">
                                                <a href="${activationLink}" target="_blank" rel="noopener" style="display:inline-block;padding:12px 22px;background:#008080;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:600;">
                                                    Activate your account
                                                </a>
                                            </p>

                                            <p style="width:100%;margin:0 0 12px;">
                                                If the button above doesn't work, copy and paste the following URL into your browser:
                                            </p>

                                            <p style="word-break:break-all;background:#f1f7f7;padding:12px;border-radius:6px;color:#006666;margin:0 0 18px;">
                                                <a href="${activationLink}" target="_blank" rel="noopener" style="color:#006666;text-decoration:underline;">${activationLink}</a>
                                            </p>

                                            <p style="margin:0;color:#666;font-size:13px;">
                                                Note: This activation link is valid for 24 hours.
                                            </p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding:18px 24px;background:#fcfcfc;text-align:center;color:#7a8a8a;font-size:13px;">
                                            <div style="width:100%;max-width:520px;margin:0 auto;">
                                                If you didn't create an account with us, you can safely ignore this email.
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding:14px 24px;background:#f1f1f1;text-align:center;color:#9aa8a8;font-size:12px;">
                                            © ${new Date().getFullYear()} Our App — All rights reserved
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
            </html>`
            }) 
        } catch (error) {
             throw {code:500,error, message:"Failed to send email", status:"EMAIL_SEND_ERR"}
            
        }
    }

    async sendResetLink(user){
        try {
            let forgetPasswordLink= AppConfig.frontendUrl+"verify-token/"+user.forgetPasswordToken;
            return await this.sendEmail({
                to:user.email,
                subject:"Reset your password",
                message: `<!doctype html>
            <html>
                <head>
                    <meta charset="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                </head>
                <body style="margin:0;padding:0;font-family:Arial, Helvetica, sans-serif;background:#f6f9fb;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;min-width:100%;">
                        <tr>
                            <td align="center" style="padding:24px;">
                                <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="width:100%;max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;">
                                    <tr>
                                        <td style="background:#008080;padding:28px 24px;color:#ffffff;text-align:left;">
                                            <h1 style="margin:0;font-size:22px;line-height:1.2;">Reset your password</h1>
                                            <p style="margin:6px 0 0;font-size:14px;opacity:0.95;">We received a request to reset your password.</p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding:28px 24px;color:#0b1820;font-size:16px;line-height:1.5;">
                                            <p style="margin:0 0 12px;">Hello ${user.firstName || user.name || user.email},</p>

                                            <p style="margin:0 0 18px;">
                                                Click the button below to set a new password for your account. This link is valid for 24 hours.
                                            </p>

                                            <p style="text-align:center;margin:18px 0;">
                                                <a href="${forgetPasswordLink}" target="_blank" rel="noopener" style="display:inline-block;padding:12px 22px;background:#008080;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:600;">
                                                    Reset password
                                                </a>
                                            </p>

                                            <p style="margin:0 0 12px;">
                                                If the button doesn't work, copy and paste the following URL into your browser:
                                            </p>

                                            <p style="word-break:break-all;background:#f1f7f7;padding:12px;border-radius:6px;color:#006666;margin:0 0 18px;">
                                                <a href="${forgetPasswordLink}" target="_blank" rel="noopener" style="color:#006666;text-decoration:underline;">${forgetPasswordLink}</a>
                                            </p>

                                            <p style="margin:0;color:#666;font-size:13px;">
                                                If you didn't request a password reset, you can safely ignore this email or contact support if you have concerns.
                                            </p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding:18px 24px;background:#fcfcfc;text-align:center;color:#7a8a8a;font-size:13px;">
                                            <div style="width:100%;max-width:520px;margin:0 auto;">
                                                Need help? Visit our support page on the site.
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding:14px 24px;background:#f1f1f1;text-align:center;color:#9aa8a8;font-size:12px;">
                                            © ${new Date().getFullYear()} Our App — All rights reserved
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
            </html>`
            })
        } catch (exception) {
            throw exception
        }
    }

    async notifyWelcomeMessage(user){
        try {
            const to = AppConfig.frontendURL+"/"
            return this.sendEmail({
                to:user.email,
                subject:"Thank you for activating your account",
                message: `
            <html>
                <head>
                    <meta charset="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                </head>
                <body style="margin:0;padding:0;font-family:Arial, Helvetica, sans-serif;background:#f6f9fb;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;min-width:100%;">
                        <tr>
                            <td align="center" style="padding:24px;">
                                <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="width:100%;max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;">
                                    <tr>
                                        <td style="background:#008080;padding:28px 24px;color:#ffffff;text-align:left;">
                                            <h1 style="margin:0;font-size:22px;line-height:1.2;">Thanks for joining us</h1>
                                            <p style="margin:6px 0 0;font-size:14px;opacity:0.95;">Your account is ready — welcome aboard.</p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding:28px 24px;color:#0b1820;font-size:16px;line-height:1.5;">
                                            <p style="width:100%;margin:0 0 12px;">Hello ${user.firstName || user.name || user.email},</p>

                                            <p style="width:100%;margin:0 0 18px;">
                                                Your account has been successfully created. You can sign in anytime using the button below.
                                            </p>

                                            <p style="text-align:center;margin:18px 0;">
                                                <a href="${AppConfig.frontendUrl}login" target="_blank" rel="noopener" style="display:inline-block;padding:12px 22px;background:#008080;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:600;">
                                                    Log in to your account
                                                </a>
                                            </p>

                                            <p style="width:100%;margin:0 0 12px;">
                                                If the button doesn't work, copy and paste the following link into your browser:
                                            </p>

                                            <p style="word-break:break-all;background:#f1f7f7;padding:12px;border-radius:6px;color:#006666;margin:0 0 18px;">
                                                <a href="${AppConfig.frontendUrl}login" target="_blank" rel="noopener" style="color:#006666;text-decoration:underline;">${AppConfig.frontendUrl}login</a>
                                            </p>

                                            <p style="margin:0;color:#666;font-size:13px;">
                                                If you have any questions, reply to our support channels on the site.
                                            </p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding:18px 24px;background:#fcfcfc;text-align:center;color:#7a8a8a;font-size:13px;">
                                            <div style="width:100%;max-width:520px;margin:0 auto;">
                                                Welcome aboard — we're excited to have you.
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding:14px 24px;background:#f1f1f1;text-align:center;color:#9aa8a8;font-size:12px;">
                                            <div style="margin-bottom:6px;">© ${new Date().getFullYear()} Our App — All rights reserved</div>
                                            <div style="font-size:10px;color:#b0b8b8;">Please do not reply to this email directly. This inbox is not monitored.</div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
            </html>`
            
            })
        } catch (error) {
             throw {code:500,error, message:"Failed to send email", status:"EMAIL_SEND_ERR"}
            
        }
    }
}

module.exports=new AuthEmailService();