const mongoose = require("mongoose");
const Stock = require("./Stock");
const Cart = require("./Cart")
const Transaction = require("./Transaction");
const Product = require("./Product");
const OrderModel = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.ObjectId,
        ref: "Customer"
    },
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
    followCode:{
        type: String,
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
    createdAt: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        default: 0
    },
    complete:{
        type:Boolean,
        default: false
    },
    cancel: {
        type: Boolean,
        default: false
    },
    paymentId:{
        type: String,
        default: ""
    },
    paymentTransactionId: {
        type: String,
        default:""
    }

})
OrderModel.post("save", async function () {
    const stock = await Stock.findOne(this.stock);
    const product = await Product.findOne(this.product).populate({ path: "stocks", select: "size color piece price type status" })
    stock.piece -= this.count;
    let newBaseStock = stock;
    if (stock.piece == 0) {
        stock.status = false;
        stock.type = "other";
        
        for (let i = 0; i < product.stocks.length; i++) {
            console.log(product.stocks[i].status);
            if (product.stocks[i].status) {

                newBaseStock = product.stocks[i];
                await Stock.findByIdAndUpdate(product.stocks[i]._id, {
                    type: "base"
                }, {
                    new: true,
                    runValidators: true
                })
                break;
            }
        }
        product.size = newBaseStock.size;
        product.color = newBaseStock.color;
        product.price = newBaseStock.price;
        product.image = newBaseStock.image;
        await product.save();
    }
    await stock.save()

    
    await Transaction.create({
        supplier: this.supplier,
        order: this,
        createdAt: this.createdAt
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
OrderModel.pre("findOneAndUpdate", async function(){
    await Transaction.findOneAndUpdate({order : this._conditions._id}, {
        complete: true,
        cancel: true
    })
})
module.exports = mongoose.model("Order", OrderModel)