const asyncHandlerWrapper = require("express-async-handler");
const Cart = require("../models/Cart");
const Stock = require("../models/Stock")
const Order = require("../models/Order")
const addToCart = asyncHandlerWrapper(async(req, res, next) => {
    const {product, stock, count} = req.body
    const findStock = await Stock.findById(stock);

    const cart = await Cart.findOne({customer: req.user.id});
    const newAmount = cart.amount + (count * findStock.price)

    cart.amount = newAmount;
    cart.items.push(
        {
            product,
            stock,
            count
        }
    )
    cart.save();
    res.status(200).json({
        data: cart
    })
    

})
const applyCart = asyncHandlerWrapper(async (req, res, next)=> {
    
    const cart = await Cart.findOne({customer: req.user.id});
    const newOrder = {
        customer : cart.customer,
        items: cart.items,
        amount: cart.amount,
        ...req.body
    };
   
    const order = await Order.create(newOrder)
    res.status(200).json({data: order})

})

module.exports = {
    addToCart,
    applyCart
}
//63fbaf706955fce1040c2a4b - 63fcd6806cc7e91af13bb085
//63fcf813992e38f9ebf362de - 63fcf848992e38f9ebf362ee
//63fcfc3f992e38f9ebf36318 - 63fcfc72992e38f9ebf3632e