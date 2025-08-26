const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const {UserRepository} = require('../repositories')

const userRepository = new UserRepository()


function generateToken(user) {
    return jwt.sign(
        {userId: user._id ,role: user.role},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    )
}

const signUp = async (userData) => {

    const {email,password} = userData

    const userExist = await userRepository.findByEmail(email)

    if(userExist){
        throw new Error('User Already Exist')
    }
    
    // hashing of password
    const hashedPassword = await bcrypt.hash(password,10)
    userData.password = hashedPassword

    const newUser = await userRepository.create(userData)
    return newUser
}

const login = async (email,password) => {
    const user = await userRepository.findByEmail(email)
    if(!user){
        throw new Error('Invalid Credentials')
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch) {
        throw new Error('Invalid Credentials')
    }

    // create a json web token 
    const token = generateToken(user)

    return {
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    }
  };
}



module.exports = {
    signUp,
    login   
}