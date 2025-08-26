
const {CategoryService} = require('../services')

async function createCategory(req,res) {
    try {
        const newCategory = await CategoryService.createCategory(req.body)
        return res
                  .status(201)
                  .json({
                    message:"Category Created Successfully",
                    category: newCategory
                  })
    } catch (error) {
        return res
                 .status(400)
                 .json({
                    error: error.message
                 })
    }
}

async function getAllCategory(req,res) {
    try {
        const allCategory = await CategoryService.getAllCategory()
        return res
                 .status(200)
                 .json({
                    success:true,
                    categories: allCategory
                 })
    } catch (error) {
        return res
                 .status(400)
                 .json({
                    error:error.message
                 })
    }
} 

async function getCategory(req,res) {
    try {
        const { id } = req.params
        const category = await CategoryService.getCategory(id)
        return res.status(200).json({
            success: true,
            message: "Category Fetched Successfully",
            data: category
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Category Fetched Failed",
            error: error.message
        })
    }
}

async function updateCategory(req,res) {
    try {
        const { id } = req.params
        const updateCategory = await CategoryService.updateCategory(id,req.body)

        return res.status(200).json({
            success: true,
            message: "Category Updated Successfully",
            data: updateCategory
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'Error Updating Category'
        })
    }
}


module.exports = {
    createCategory,
    getAllCategory,
    updateCategory,
    getCategory
}