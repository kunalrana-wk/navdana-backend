
const express = require('express')
const router = express.Router()
const { OrderController } = require('../../controllers')
const { AuthMiddleware } = require('../../middlewares')

router.post('/',
    // AuthMiddleware.auth,
    // AuthMiddleware.isCustomer,
    OrderController.createOrder
)

router.get('/user-orders',
    // AuthMiddleware.auth,
    OrderController.getUserOrders
)

router.get('/:orderId',
    OrderController.getOrder
)

router.get('/',
    // AuthMiddleware.auth,
    // AuthMiddleware.isAdmin,
    OrderController.getAllOrders
)

router.patch('/:orderId/status',
    AuthMiddleware.auth,
    AuthMiddleware.isAdmin,
    OrderController.updateOrderStatus
)

module.exports = router