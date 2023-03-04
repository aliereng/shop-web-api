const mongoose = require("mongoose");
const Stock = require("./Stock");
const Cart = require("./Cart")
const Product = require("./Product")
const Transaction = require("./Transaction");
const OrderModel = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.ObjectId,
        ref: "Customer"
    },
    items: [
        {
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
            shipper: {
                type: mongoose.Schema.ObjectId,
                ref: "Shipper"
            }
        }
    ],

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


    this.items.map(async (item) => {
        let stock = await Stock.findById(item.stock);
        let product = await Product.findById(item.product);
        stock.piece -= item.count;
        stock.save();
        const transaction = await Transaction.findOne({ supplier: product.supplier })
        let newItem = {
            product: product.name,
            stock: stock.size,
            color: stock.color,
            count: item.count,
            deliveredAddress: this.deliveredAddress,
            invoiceAddress: this.invoiceAddress,
            order: this._id
        }
        if (transaction) {
            transaction.items.push(newItem)
            transaction.save();
        } else {
            const transaction = await Transaction.create({
                supplier: product.supplier
            })
            transaction.items.push(newItem);
            transaction.save();
        }

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