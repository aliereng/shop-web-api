const mongoose = require("mongoose");

const TransactionModel = new mongoose.Schema({
    supplier: {
        type: mongoose.Schema.ObjectId,
        ref: "Supplier"
    },
    
    items: [
        {
            product:String,
            stock: String,
            color: String,
            count: String,
            deliveredAddress: {
                type: mongoose.Schema.ObjectId,
                ref:"Address"
            },
            invoiceAddress: {
                type: mongoose.Schema.ObjectId,
                ref:"Address"
            },
            orderStatus: {
                type: Boolean,
                default: false,
            },
            shippedStatus: {
                type: Boolean,
                default: false,
            },
            shipper: {
                type: mongoose.Schema.ObjectId,
                ref: "Shipper"
            },
            order: {
                type: mongoose.Schema.ObjectId,
                ref: "Order"
            }
        }
    ]
    
})

module.exports = mongoose.model("Transaction", TransactionModel)