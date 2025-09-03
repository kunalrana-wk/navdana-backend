const express = require('express')
const router = express.Router()
const {AuthController} = require('../../controllers')

router.post('/verify',
    AuthController.checkSignUpOrLogin
)

// router.post('/login',
//     AuthController.login
// )

router.post('/logout',
    AuthController.logOut
)

router.post('/send-otp',
    AuthController.sendOTP
)

module.exports = router