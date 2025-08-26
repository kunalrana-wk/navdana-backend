const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true, // who placed the order
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
            },
        ],
        shippingAddress: {
            fullName: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
            phone: { type: String },
        },
        paymentMethod: {
            type: String,
            enum: ["card", "paypal", "cash_on_delivery"],
            required: true,
        },
        paymentResult: {
            id: String,
            status: String,
            update_time: String,
            email_address: String,
        },
        prices: {
            itemsPrice: { type: Number, required: true },
            taxPrice: { type: Number, required: true },
            shippingPrice: { type: Number, required: true },
            totalPrice: { type: Number, required: true },
        },
        status: {
            type: String,
            enum: ["pending", "processing", "completed", "cancelled"],
            default: "pending",
        },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        deliveredAt: { type: Date },
    },
    {
        timestamps: true, // adds createdAt, updatedAt automatically
    }
);

module.exports = mongoose.model('Order', orderSchema);
