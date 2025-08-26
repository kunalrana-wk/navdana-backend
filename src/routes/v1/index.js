const express = require('express')
const router = express.Router()

const authRoute = require('./user-routes')
const categoryRoute = require('./category-route')
const productRoute = require('./product-route')
const orderRoute = require('./order-route')
const bannerRoute = require('./banner-route')

router.use('/user',authRoute)
router.use('/category',categoryRoute)
router.use('/product',productRoute)
router.use('/order',orderRoute)
router.use('/banner',bannerRoute)

module.exports = router