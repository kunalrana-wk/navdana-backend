const { OrderRepository, CrudRepository } = require('../repositories')

const orderRepository = new OrderRepository()

async function createOrder(userId, items, shippingAddress, paymentMethod) {
    let updatedItems = [];
    let itemsPrice = 0;

    console.log("USER ID INSIDE CREATE ORDER SERVICE:", userId);

    for (const item of items) {
        if (!item.quantity || item.quantity <= 0) {
            throw new Error(`Invalid quantity for product: ${item.product}`);
        }

        // ✅ check availability of specific variant
        console.log("Before Check Avail.");
        const product = await orderRepository.checkAvailabityAndUpdate(item);
        console.log("After Check Avail.");

        if (!product) {
            throw new Error(
                `Not enough stock for product: ${item.product}, variant: ${item.color} - ${item.size}`
            );
        }

        // ✅ calculate price from DB
        const quantityPrice = product.price * item.quantity;
        itemsPrice += quantityPrice;

        // ✅ save variant details also in the order
        updatedItems.push({
            product: product._id,
            name: product.name,
            quantity: item.quantity,
            price: product.price,
            size: item.size,
            color: item.color,
            sku: item.sku
        });
    }

    // calculate final prices
    const shippingPrice = itemsPrice > 1000 ? 0 : 50;
    const taxPrice = 0; // you can add GST/VAT logic later
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    console.log("Before Order Creation");

    // ✅ create order in DB
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

    console.log("ORDER INITIATED IS:", order);
    console.log("USER ID INSIDE ORDER SERVICE IS:", userId);

    await orderRepository.addOrderToUser(order._id, userId);

    console.log("AFTER ORDER UPDATION:", order);
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