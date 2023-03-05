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
TransactionModel.post("save", async function(){
    await Order.findByIdAndUpdate(this.order, {
       ...this.order
    },{
        new:true,
        runValidators: true,
        rawResult: true
    })
})

module.exports = mongoose.model("Transaction", TransactionModel)