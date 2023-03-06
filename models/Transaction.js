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
    }
    
})


module.exports = mongoose.model("Transaction", TransactionModel)