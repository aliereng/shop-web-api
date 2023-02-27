const asyncHandlerWrapper = require("express-async-handler");
const Cart = require("../models/Cart");
const Stock = require("../models/Stock")
const addToCart = asyncHandlerWrapper(async(req, res, next) => {
    const {product, stock, count} = req.body
    const findStock = await Stock.findById(stock);
    
    const cart = await Cart.findOne({customer: req.user.id});
    const newAmount = cart.amount + (count * findStock.price)

    console.log(product +" / " + stock + " / "+ count +
    " / "+ newAmount)
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

module.exports = {
    addToCart
}