const mongoose = require('mongoose')


const connectDB = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017',{
            maxPoolSize: 500
        })
        console.log('MongoDB Connected Successfully')
    } catch (error) {
        console.log('MongoDB Connection Failes',error)
        process.exit(1)
    }
}

module.exports = {connectDB}