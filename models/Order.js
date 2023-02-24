const mongoose = require("mongoose");
const Customer = require("./Customer");
const OrderModel = new mongoose.Schema({
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
    products: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Product"
        }
    ],
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
    orderStatus:{
        type: Boolean,
        default: false,
    },
    shippedStatus:{
        type: Boolean,
        default: false,
    },
    paymentStatus:{
        type: Boolean,
        default: false,
    },
    orderAmount: Number

})

OrderModel.post("save", async function(next){
    if(this.paymentStatus){
        const customer = await Customer.findById(this.customer);
        customer.transactions.orders.push(this._id);
        customer.save();
    }
    if(this.orderStatus && this.shippedStatus && this.paymentStatus){
        const customer = await Customer.findById(this.customer);
        const index = customer.transactions.orders.indexOf(this._id);
        customer.pastTrancactions.orders.push(this._id)
        customer.transactions.orders.slice(index, 1);
        customer.save();
    }

})

module.exports = mongoose.model("Order", OrderModel)