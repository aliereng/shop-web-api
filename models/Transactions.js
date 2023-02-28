const mongoose = require("mongoose");

const TransactionsModel = new mongoose.Schema({
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

module.exports = mongoose.model("Transactions", TransactionsModel)