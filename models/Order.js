const mongoose = require("mongoose");
const Stock = require("./Stock");
const Cart = require("./Cart")
const Transaction = require("./Transaction");
const OrderModel = new mongoose.Schema({
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
    orderStatus: {
        type: Boolean,
        default: false,
    },
    shippedStatus: {
        type: Boolean,
        default: false,
    },
    supplier: {
        type: mongoose.Schema.ObjectId,
        ref: "Supplier"
    },
    shipper: {
        type: mongoose.Schema.ObjectId,
        ref: "Shipper"
    },
    deliveredAddress: {
        type: mongoose.Schema.ObjectId,
        ref: "Address"
    },
    invoiceAddress: {
        type: mongoose.Schema.ObjectId,
        ref: "Address"
    },
    createdAdd: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        default: 0
    }

})
OrderModel.post("save", async function () {
    let stock = await Stock.findById(this.stock);
    stock.piece -= this.count;
    stock.save();
    await Transaction.create({
        supplier: this.supplier,
        order: this
    })
    await Cart.findOneAndUpdate({ customer: this.customer }, {
        items: [],
        amount: 0
    }, {
        new: true,
        runValidators: true
    })

})

// OrderModel.post("save", async function(next){
//     if(this.paymentStatus){
//         const customer = await Customer.findById(this.customer);
//         customer.Transaction.orders.push(this._id);
//         customer.save();
//     }
//     if(this.orderStatus && this.shippedStatus && this.paymentStatus){
//         const customer = await Customer.findById(this.customer);
//         const index = customer.Transaction.orders.indexOf(this._id);
//         customer.pastTrancactions.orders.push(this._id)
//         customer.Transaction.orders.slice(index, 1);
//         customer.save();
//     }

// })

module.exports = mongoose.model("Order", OrderModel)