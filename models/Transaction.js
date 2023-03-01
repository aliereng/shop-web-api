const mongoose = require("mongoose");

const TransactionModel = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.ObjectId,
        ref: "Customer"
    },
    suppliers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Supplier"
        }
    ],
    order: 
        {
            type: mongoose.Schema.ObjectId,
            ref:"Order"
        }
    
})

module.exports = mongoose.model("Transaction", TransactionModel)