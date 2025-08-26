const express = require('express')
const router = express.Router()
const {CategoryController} = require('../../controllers')
const {AuthMiddleware} = require('../../middlewares')
const parser = require('../../middlewares/upload')

router.post('/',
    AuthMiddleware.auth,
    AuthMiddleware.isAdmin,
    parser.single('image'),
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




