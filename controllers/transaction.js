const asyncHandlerWrapper = require("express-async-handler");
const Cart = require("../models/Cart")
const Order = require("../models/Order");
const Product = require("../models/Product");
const Transaction = require("../models/Transaction");
const getAllTrancactions = asyncHandlerWrapper(async (req, res, next)=> {
    
    const cart = await Cart.findOne({customer: req.user.id});
    const newOrder = {
        customer : req.user.id,
        items: [
            
        ],
        amount: cart?.amount,
        ...req.body
    };
   

    cart.items.map(async item => {
        newOrder.items.push(
    
            {product: item.product, stock: item.stock, count: item.count}
        )
    })
    const order = await Order.create(newOrder)
    res.status(200).json({data: order})

})
const getTransactionById = asyncHandlerWrapper(async(req, res, next) => {
    res.status(200).json(res.queryResults);
})
const deleteAllTransactions = asyncHandlerWrapper(async(req, res, next) => {
    await Transaction.deleteMany();
    res.status(200).json({
        success:true,
        messages: "All transactions deleted."
    })
})

const deleteTransactionById = asyncHandlerWrapper(async(req, res, next)=> {
    const {transactionId} = req.params;
    await Transaction.findByIdAndDelete(transactionId);
    res.status(200).json({
        success: true,
        message: "Transaction delete operation success"
    })
})

module.exports = {
    getAllTrancactions,
    getTransactionById,
    deleteAllTransactions,
    deleteTransactionById
}