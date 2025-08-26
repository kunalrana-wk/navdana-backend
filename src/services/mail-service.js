
const transporter = require('../config/nodemailer')
const welcomeEmailTemplate = require('../emails/welcome-email');

require('dotenv').config()



async function sendWelcomeMail(firstName,emailId) {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: emailId,
        subject: "Welcome !",
        html: welcomeEmailTemplate(firstName)
    })
}

module.exports = {
    sendWelcomeMail
}