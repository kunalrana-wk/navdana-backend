const { AuthService, MailService } = require('../services')
const otpGenerator = require('otp-generator')
const OTP = require('../models/otp-model')

require('dotenv').config()


async function sendOTP(req, res) {
    try {
        const { email } = req.body
        // generate-otp
        let otp
        let existingOtp
        do {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            })
            existingOtp = await OTP.findOne({ otp })
        } while (existingOtp)

        console.log("Before OTP create")
        await OTP.create({ email, otp })
        console.log("After OTP create")

        return res.status(200).json({
            success: true,
            message: "OTP sent to email successfully"
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in OTP Sending",
            error: error.message
        })
    }
}

async function signUp(req, res) {
    try {
        // const newUser = await AuthService.signUp(req.body)
        const { email, otp } = req.body

        // find most recent otp to the particular ID from database
        console.log("Before OTP")
        const recentOTP = await OTP.find({ email })
            .sort({ createdAt: -1 })
            .limit(1)

        console.log(recentOTP)

        /// VALIDATE OTP
        if (recentOTP.length === 0) {
            // otp not exist
            return res.status(400).json({
                success: false,
                message: "OTP not Found",
            });

        } else if (otp !== recentOTP[0].otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        const name = req.body.name

        await AuthService.signUp({ email, name })

        MailService.sendWelcomeMail(req.body.firstName, req.body.email)

        return res
            .status(201)
            .json({
                message: 'User Created Successfully',
            })
    } catch (error) {
        return res
            .status(400)
            .json({ error: error.message })
    }
}

async function login(req, res) {
    try {
        const { email, otp } = req.body

        // find most recent otp to the particular ID from database
        console.log("Before OTP")
        const recentOTP = await OTP.find({ email })
            .sort({ createdAt: -1 })
            .limit(1)

        console.log(recentOTP)

        /// VALIDATE OTP
        if (recentOTP.length === 0) {
            // otp not exist
            return res.status(400).json({
                success: false,
                message: "OTP not Found",
            });

        } else if (otp !== recentOTP[0].otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        const result = await AuthService.login(email)

        const token = result.token

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        })

        res.status(200).json({
            message: 'Login successful',
            user: result.user
        });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

async function logOut(req, res) {
    try {


        // clear cookies
        res.clearCookie('token')

        return res.status(200).json({
            success: true,
            message: "Logged Out Successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error in Looged Out",
            error: error.message
        })
    }
}

module.exports = { signUp, login, logOut, sendOTP }