const mongoose = require("mongoose");
const Stock = require("./Stock");
const Cart = require("./Cart")
const Product = require("./Product")
const Transactions = require("./Transactions");
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
                ref:  "Stock"
            },
            count: {
                type: Number,
                default: 0
            }
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
    amount: {
        type: Number,
        default:0
    }

})
OrderModel.post("save", async function(){
    
    const currentSupplier = []
    this.items.map(async(item) => {
        let stock = await Stock.findById(item.stock);
        let product = await Product.findById(item.product);
        currentSupplier.push( product.supplier)
        stock.piece -= item.count;
        stock.save();
    })
    setTimeout(async () => {
        await Transactions.create({
            customer: this.customer,
            suppliers: currentSupplier,
            order: this
        })
    }, 1000);
    await Cart.findOneAndUpdate({customer: this.customer}, {
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
//         customer.transactions.orders.push(this._id);
//         customer.save();
//     }
//     if(this.orderStatus && this.shippedStatus && this.paymentStatus){
//         const customer = await Customer.findById(this.customer);
//         const index = customer.transactions.orders.indexOf(this._id);
//         customer.pastTrancactions.orders.push(this._id)
//         customer.transactions.orders.slice(index, 1);
//         customer.save();
//     }

// })

module.exports = mongoose.model("Order", OrderModel)