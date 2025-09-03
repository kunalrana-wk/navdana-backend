const { OrderService } = require('../services')

async function createOrder(req,res) {
    try {
        const { items, shippingAddress, paymentMethod } = req.body

        // fetched id from authentication middleware

        console.log("All Order Details:",req.body)

        const userId = req.user.userId
        // console.log("Uer id is:",req.user)
        const order = await OrderService.createOrder(userId,items,shippingAddress,paymentMethod)

        return res.status(201).json({
            success: true,
            message: "Order Created Successfully",
            data: order
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

async function getUserOrders(req,res) {
    try {
        const userId = req.user.userId
        const userOrders = await OrderService.getUserOrders(userId)
        return res.status(200).json({
            success:true,
            message:"User Orders Fetched Successfully",
            orders: userOrders
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error in Fetching User Order",
            error: error.message
        })   
    }
}

async function getOrder(req,res) {
    try {
        const {orderId} = req.params
        
        const order = await OrderService.getOrder(orderId)
        return res.status(200).json({
            success: true,
            message: "Order Fetched Successfully",
            data: order
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error in Order Fetching",
            error: error.message
        })
    }
}

async function getAllOrders(req,res) {
    try {
        const orders = await OrderService.getAllOrders()
        return res.status(200).json({
            success: true,
            message: "Orders Fetched Successfully",
            orders: orders
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error in all Orders Fetching",
            error: error.message
        })
    }
}

async function updateOrderStatus(req,res) {
    try {
        const { orderId } = req.params
        const orderStatus = req.body.status

        const order = await OrderService.updateOrderStatus(orderId,orderStatus)

        return res.status(200).json({
            success: true,
            message: "Order Status Updated Successfully",
            updatedStatusOrder: order
        })
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: "Error in Order Status Updation",
            error: error.message
        })
    }
}

module.exports = {
    createOrder,
    getUserOrders,
    getOrder,
    getAllOrders,
    updateOrderStatus
}