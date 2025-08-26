const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL,{
            maxPoolSize: 500
        })
        console.log('MongoDB Connected Successfully')
    } catch (error) {
        console.log('MongoDB Connection Failes',error)
        process.exit(1)
    }
}

module.exports = {connectDB}