const cloudinary = require('cloudinary').v2

require('dotenv').config()

cloudinary.config({
    cloud_name: "dcmkct12y",
    api_key: "853247965687173",
    api_secret: "jSYdd9YBrhnpOBYIZ5uq3Rfrqg4"
})

module.exports = cloudinary