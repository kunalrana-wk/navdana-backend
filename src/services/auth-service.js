const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const { UserRepository } = require('../repositories')

const userRepository = new UserRepository()


function generateToken(user) {
    return jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )
}

async function sendAuthToken(user) {
    try {
        // generate the token
        const token = await generateToken(user)
        console.log("Token is:",token)
        return {
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        }
    } catch (error) {
        console.log('Error in sending Authentication Token:',error)
    }
}

const signUp = async (userData) => {
    const newUser = await userRepository.create(userData)
    // generate and send authentication tokwn to the controller
    const tokenObj = await sendAuthToken(userData.email)
    return {newUser,tokenObj}
}

const login = async (email, password) => {
    const user = await userRepository.findByEmail(email)

    // if (!user) {
    //     throw new Error('Invalid Credentials')
    // }

    // create a json web token and send it to the cookie 
    return sendAuthToken(user)
}

async function userExist(email) {
    return await userRepository.findByEmail(email)
}



module.exports = {
    signUp,
    login,
    userExist
}