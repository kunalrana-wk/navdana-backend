const CrudRepository = require("./crud-repository");
const { UserModel } = require('../models')

class UserRepository extends CrudRepository {
    constructor() {
        super(UserModel)
    }

    async findByEmail(email){
        try {
            const user = await UserModel.findOne({email})
            return user
        } catch (error) {
            console.log(err)
            throw error 
        }
    }
}

module.exports = UserRepository