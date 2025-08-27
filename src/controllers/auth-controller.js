const { AuthService,MailService } = require('../services')
const otpGenerator = require('otp-generator')
const OTP = require('../models/otp-model')

require('dotenv').config()

async function sendOTP(req,res) {
    try {
        const { email } = req.body
        // check user with that email already exist or not
        const user = await AuthService.userExist(email)
        if(user){
            return res.status(400).json({
                success: false,
                message: "User Already Exist"
            })
        }

        // generate-otp
        let otp = otpGenerator.generate(6,{
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })

        const result = await OTP.findOne({otp:otp})

        while(result) {
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            })
            result = await OTP.findOne({otp:otpGenerator})
        }

        const otpPayload = {email,otp}
        const otpBody = await OTP.create(otpPayload)
        
        // return response 
        return res.status(200).json({
            success: false,
            message: "OTP Send Successfully",
            otp
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in OTP Sending",
            error: error.message
        })
    }
}

async function signUp(req, res){
    try {
        const newUser = await AuthService.signUp(req.body)

        MailService.sendWelcomeMail(req.body.firstName,req.body.email)

        return res
            .status(201)
            .json({
                message: 'User Created Successfully',
                userId: newUser._id
            })
    } catch (error) {
        return res
            .status(400)
            .json({ error: error.message })
    }
}

async function login(req, res) {
    try {
        const email = req.body.email
        const password = req.body.password

        const result = await AuthService.login(email,password)

        const token = result.token

        res.cookie('token',token,{
            httpOnly: true,
            maxAge: 24*60*60*1000,
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

async function logOut(req,res) {
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

module.exports = { signUp,login,logOut,sendOTP }