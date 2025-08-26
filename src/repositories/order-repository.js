const CrudRepository = require('./crud-repository')
const { OrderModel } = require('../models')
const { ProductModel } = require('../models')

class OrderRepository extends CrudRepository {
    constructor(){
        super(OrderModel)
    }

    // check for the particular product stock is available or not
    async checkAvailabityAndUpdate(item){
        const product = await ProductModel.findOneAndUpdate(
            {_id:item.product,stock:{$gte: item.quantity}},
            { $inc: {stock: -item.quantity}},
            {new:true}
        )
        return product
    }

    // change the order status by the admin
    async updateOrderStatus(orderId,orderStatus) {
        const order = await OrderModel.findByIdAndUpdate(orderId,
            {status:orderStatus},
            {new: true, runValidators:true }
        )
        return order
    }
}

module.exports = OrderRepository