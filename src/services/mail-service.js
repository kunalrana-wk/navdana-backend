
const transporter = require('../config/nodemailer')
const welcomeEmailTemplate = require('../emails/welcome-email');
const emailVerificationTemplate = require('../emails/email-verification')


require('dotenv').config()



async function sendWelcomeMail(firstName,emailId) {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: emailId,
        subject: "Welcome !",
        html: welcomeEmailTemplate(firstName)
    })
}

async function sendVerificationEmail(email,otp) {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verification Email from Navdana",
            html: emailVerificationTemplate(otp)
        })
    } catch (error) {
        console.log("Error in Email Verification")
    }
}

module.exports = {
    sendWelcomeMail,
    sendVerificationEmail
}