const mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    url:{
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Banner', bannerSchema);
