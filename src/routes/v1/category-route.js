const express = require('express')
const router = express.Router()
const {CategoryController} = require('../../controllers')
const {AuthMiddleware} = require('../../middlewares')

router.post('/',
    AuthMiddleware.auth,
    AuthMiddleware.isAdmin,
    CategoryController.createCategory
)

router.get('/',
    CategoryController.getAllCategory
)

router.get('/:id',
    AuthMiddleware.auth,
    AuthMiddleware.isAdmin,
    CategoryController.getCategory
)

router.put('/:id',
    AuthMiddleware.auth,
    AuthMiddleware.isAdmin,
    CategoryController.updateCategory
)

module.exports = router