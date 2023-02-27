const mongoose = require("mongoose");
const Product = require("./Product");

const StockModel = new mongoose.Schema({
    product: {
        type: mongoose.Schema.ObjectId,
        ref:"Product"
    },
    size: {
        type: String
    },
    color: {
        type: String
    },
    piece: {
        type:Number, 
        default: 0
    },
    price: {
        type: Number,
        default:0
    }
   
})

module.exports = mongoose.model("Stock", StockModel)