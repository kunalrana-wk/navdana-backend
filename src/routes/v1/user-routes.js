const express = require('express')
const router = express.Router()
const {AuthController} = require('../../controllers')

router.post('/',
    AuthController.signUp
)

router.post('/login',
    AuthController.login
)

router.post('/logout',
    AuthController.logOut
)

module.exports = router