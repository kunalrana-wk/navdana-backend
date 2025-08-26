const { ProductRepository } = require('../repositories')

const productRepository = new ProductRepository()

async function createProduct(data) {
    const product = await productRepository.create(data)
    return product
}

async function getAllProducts() {
    const products = await productRepository.getAll()
    if(!products || products.length===0){
        throw new Error('No Product Found')
    }
    return products
}

async function getProduct(id) {
    const product = await productRepository.getById(id)
    if(!product) {
        throw new Error('Product Not Found for that ID')
    }
    return product
}
 

async function deleteProduct(id) {
    const product = await productRepository.delete(id)
    return product
}

async function updateProduct (id,data) {
    const updateProduct = await productRepository.update(id,data)
    return updateProduct
}

async function getProductFilter({}) {

}



module.exports = {
    createProduct,
    getAllProducts,
    getProductFilter,
    updateProduct,
    getProduct,
    deleteProduct
}