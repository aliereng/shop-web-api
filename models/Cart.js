const mongoose = require("mongoose");

const CartModel = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.ObjectId,
        ref:"Customer"
    },
    amount: {
        type: Number,
        default:0
    },
    status: {
        type: Boolean,
        default: false
    },
    items: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product"
            },
            stock: {
                type: mongoose.Schema.ObjectId,
                ref: "Stock"
            },
            count: {
                type: Number,
                default: 0
            },
            price: {
                type:Number,
                default:0
            }
        }
    ]
})


module.exports = mongoose.model("Cart", CartModel)