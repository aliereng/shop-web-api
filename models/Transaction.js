const mongoose = require("mongoose");
const Order = require("../models/Order")
const TransactionModel = new mongoose.Schema({
    supplier: {
        type: mongoose.Schema.ObjectId,
        ref: "Supplier"
    },
    
    order: {
        type: mongoose.Schema.ObjectId,
        ref:"Order"
    },
    createdAt:{
        type:Date
    },
    complete:{
        type:Boolean,
        default:false
    }
    
})


module.exports = mongoose.model("Transaction", TransactionModel)