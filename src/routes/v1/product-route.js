const express = require('express')
const router = express.Router()
const { ProductController } = require('../../controllers')
const { AuthMiddleware } = require('../../middlewares')
const parser = require('../../middlewares/upload')

router.post('/',
    // AuthMiddleware.auth,
    // AuthMiddleware.isAdmin,
    parser.array("images",5),
    ProductController.createProduct
)   

router.get('/',
    ProductController.getAllProducts
)

router.get('/:id',
    // AuthMiddleware.auth,
    AuthMiddleware.isAdmin,
    ProductController.getProduct
)

router.delete('/:id',
    AuthMiddleware.auth,
    AuthMiddleware.isAdmin,
    ProductController.deleteProduct
)

router.put('/:id',
    AuthMiddleware.auth,
    AuthMiddleware.isAdmin,
    ProductController.updateProduct
)


module.exports = router