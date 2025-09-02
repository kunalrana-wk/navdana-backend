const { ProductService } = require('../services')


async function createProduct(req, res) {
  try {

    const { name, description, category, price, stock,color,size } = req.body;

    console.log("Colour is :",color)
    if (!name || !description || !category || !price) {
      throw new Error("All required fields must be provided");
    }

    const images = req.files.map(file => ({ url: file.path, alt: name }));

    console.log("Images is:",images)

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      stock: Number(stock || 0),
      images,  
      size,
      color:color,
      ratings: { average: 0, count: 0 },
      isActive: true
    };

    // console.log(req.body.color)
    const product = await ProductService.createProduct(productData);

    return res.status(201).json({ success: true, message: "Product Created Successfully", data: product });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Error in Product Creation", error: error.message });
  }
}

async function getAllProducts(req, res) { 
    try {
        const products = await ProductService.getAllProducts(req.body)
        return res.status(200).json({
            success: true,
            message: "Product Fetched Successfully",
            data: products
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: "Error in Product Fetching",
            error: error.message
        })
    }
}

async function getProduct(req, res) {
    try {
        const { id } = req.params
        // console.log("User ID is:",req.user.userId)
        const product = await ProductService.getProduct(id)
        return res.status(200).json({
            success: false,
            message: "Product Fetched By ID",
            data: product
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in Product Fetching",
            error: error.message
        })
    }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params
        console.log("Product ID is:",id)
        const product = await ProductService.deleteProduct(id)
        return res.status(200).json({
            success: true,
            message: "Product Deleted Successfully",
            deletedProduct: product
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: "Error in Product Deletion",
            error: error.message
        })
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params
        const data = req.body
        
        const updatedProduct = await ProductService.updateProduct(id,data)
        return res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            updatedProduct: updatedProduct
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error in Product Updation",
            error: error.message
        })
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    deleteProduct,
    updateProduct
}