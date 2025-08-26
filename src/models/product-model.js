const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        images: [
            {
                url: { type: String, required: true },
                alt: { type: String },
            },
        ],
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
        },
        ratings: {
            average: { type: Number, default: 0 }, // avg rating (1–5)
            count: { type: Number, default: 0 }, // number of reviews
        },
        // reviews: [
        //     {
        //         user: {
        //             type: mongoose.Schema.Types.ObjectId,
        //             ref: "User",
        //         },
        //         name: { type: String, required: true },
        //         rating: { type: Number, required: true },
        //         comment: { type: String },
        //         createdAt: { type: Date, default: Date.now },
        //     },
        // ],
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt
    }
);

module.exports = mongoose.model('Product', productSchema);

