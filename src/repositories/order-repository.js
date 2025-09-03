const CrudRepository = require('./crud-repository')
const { OrderModel } = require('../models')
const { ProductModel } = require('../models')
const { UserModel } = require('../models')

class OrderRepository extends CrudRepository {
    constructor() {
        super(OrderModel)
    }

    // check for the particular product stock is available or not
    async checkAvailabityAndUpdate(item) {
        const product = await ProductModel.findOneAndUpdate(
            { _id: item.product, stock: { $gte: item.quantity } },
            { $inc: { stock: -item.quantity } },
            { new: true }
        )
        return product
    }

    // change the order status by the admin
    async updateOrderStatus(orderId, orderStatus) {
        const order = await OrderModel.findByIdAndUpdate(orderId,
            { status: orderStatus },
            { new: true, runValidators: true }
        )
        return order
    }

    // after creating order push that order into the user order array
    async addOrderToUser(orderId, userId) {
        console.log("ORDER REPO:::::: USER ID INSIDE ORDER REPO:", userId)
        console.log("ORDER REPO:::::: ORDER ID INSIDE ORDER REPO:", orderId)

        const user = await UserModel.findByIdAndUpdate(
            userId,
            { $push: { orders: orderId } },
            { new: true }
        )
        console.log("UPDATES USER ORDER:", user)
        return user
    }
}

module.exports = OrderRepository