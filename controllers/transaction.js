const asyncHandlerWrapper = require("express-async-handler");
const Cart = require("../models/Cart")
const Order = require("../models/Order");
const Product = require("../models/Product");
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


module.exports = {
    getAllTrancactions
}