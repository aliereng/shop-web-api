const mongoose = require("mongoose");

const CartModel = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.ObjectId,
        ref:"Customer"
    },
    cartAmount: Number,
    products: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product"
            },
            count: Number
        }
    ]
})

module.exports = mongoose.model("Cart", CartModel)