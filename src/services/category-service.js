const { CategoryRepository } = require('../repositories')

const categoryRepository = new CategoryRepository()

async function createCategory(data) {
    const newCategory = await categoryRepository.create(data)
    return newCategory
}

async function getAllCategory() {
    const allCategory = await categoryRepository.getAll()

    if(!allCategory) {
        throw new Error('Categories Fetched Successfully')
    }

    return allCategory
}

async function getCategory(id) {
    const category = await categoryRepository.getById(id)
    if(!category) {
        throw new Error('Category Not Found')
    }
    return category
}

async function updateCategory(id,data) {
    const category = await categoryRepository.update(id,data)
    if(!category) {
        throw new Error('Category Not Found')
    }
    return category
}




module.exports = {
    createCategory,
    getAllCategory,
    getCategory,
    updateCategory
}