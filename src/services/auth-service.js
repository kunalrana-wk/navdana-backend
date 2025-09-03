const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const { UserRepository } = require('../repositories')

const userRepository = new UserRepository()


function generateToken(id,role) {
    console.log("GENERATED USER ID:",id)
    console.log("GENERATED ROLE:",role)
    return jwt.sign(
        { userId: id, role: role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )
}


async function sendAuthToken(id,role,newUser) {
    try {
        // generate the token
        const token =  generateToken(id,role)
        console.log("Token is:",token)
        return {
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        }
    } catch (error) {
        console.log('Error in sending Authentication Token:',error)
    }
}

const signUp = async (userData) => {
  try {
    console.log("User data in Send Service:", userData);

    // create new user (no password)
    const newUser = await userRepository.create(userData);

    console.log("After User created:", newUser);

    // generate token for new user
    const tokenObj = await sendAuthToken(newUser._id,newUser.role,newUser);

    return { newUser, tokenObj };
  } catch (error) {
    console.log("Error is:", error);
  }
};



const login = async (email) => {
  // after OTP verification is successful
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new Error("User not found. Please sign up first.");
  }

  console.log("USER IN LOGIN ROUTE",user)

  return sendAuthToken(user._id,user.role,user);
};

async function userExist(email) {
    return await userRepository.findByEmail(email)
}



module.exports = {
    signUp,
    login,
    userExist,
}