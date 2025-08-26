const { OrderRepository, CrudRepository } = require('../repositories')

const orderRepository = new OrderRepository()

async function createOrder(userId, items, shippingAddress, paymentMethod) {
    let updatedItems = [];
    let itemsPrice = 0;

    // loop over items
    for (const item of items) {
        if (!item.quantity || item.quantity <= 0) {
            throw new Error(`Invalid quantity for product: ${item.product}`);
        }

        // check availability + update stock
        console.log("Before Check Avail.")
        const product = await orderRepository.checkAvailabityAndUpdate(item);
        console.log(item)
        if (!product) {
            throw new Error(`Not enough stock for product: ${item.product}`);
        }
        console.log('After Check Avail')

        // calculate price from DB (not frontend)
        const quantityPrice = product.price * item.quantity;
        itemsPrice += quantityPrice;

        // prepare item for order
        updatedItems.push({
            product: product._id,
            name: product.name,
            quantity: item.quantity,
            price: product.price
        });
    }

    // calculate final prices
    const shippingPrice = itemsPrice > 1000 ? 0 : 50;
    const taxPrice = 0; // you can add GST/VAT logic later
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    // create order in DB
    console.log("Before Order Creation")
    const order = await orderRepository.create({
        user: userId,
        items: updatedItems,
        shippingAddress,
        paymentMethod,
        prices: {
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        }
    });

    return order;
}

async function getUserOrders(userId) {
    const userOrders = await orderRepository.getAll({user:userId})
    return userOrders
}


async function getOrder(orderId) {
    const order = await orderRepository.getById(orderId)
    return order
}


async function getAllOrders() {
    const orders = await orderRepository.getAll()
    return orders
}

async function updateOrderStatus(orderId,orderStatus) {
    const order = await orderRepository.updateOrderStatus(orderId,orderStatus)
    return order
}

module.exports = {
    createOrder,
    getUserOrders,
    getAllOrders,
    getOrder,
    updateOrderStatus
}