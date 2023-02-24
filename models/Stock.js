const mongoose = require("mongoose");

const StockModel = new mongoose.Schema({
    product: {
        type: mongoose.Schema.ObjectId,
        ref:"Product"
    },
    sizes: [
        {
            size:{
                type: String
            },
            quantity: {
                type: Number
            },
            price: {
                type: Number
            }
        }
    ]
})

module.exports = mongoose.model("Stock", StockModel)