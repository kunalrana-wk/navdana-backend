const CrudRepository = require('./crud-repository')
const {ProductModel} = require('../models')

class ProductRepository extends CrudRepository {
    constructor(){
        super(ProductModel)
    }
}

module.exports = ProductRepository