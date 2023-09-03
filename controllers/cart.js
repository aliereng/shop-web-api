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
            count,
            price: findStock.price
        }
    )
    cart.save();
    res.status(200).json({
        success: true,
        message: "Sepete Eklendi"
    })
    

})
const applyCart = asyncHandlerWrapper(async (req, res, next)=> {
    
    const cart = await Cart.findOne({customer: req.user.id}).populate([
        {path:"items", select:"product stock items", populate:{path:"product", select:"slug image name supplier", populate:{path:"supplier", select:"shopName slug"}}},
        {path:"items", select:"stock", populate:{path:"stock", select:"color size price"}}
    ]);
    let transactionId = "";
    cart.items.map(async item => {
        req.body.itemTransactions.map(transaction=> {
            // console.log(`itemId: ${transaction.itemId}\npaymentTransactionId: ${transaction.paymentTransactionId}\n item.product_id: ${item.product._id}`)
            if(transaction.itemId == item.product._id){
                transactionId = transaction.paymentTransactionId
                console.log("true");
            }
        })
        await Order.create({
            customer: req.user.id,
            product:item.product._id,
            stock: item.stock,
            count: item.count,
            amount: item.price,
            supplier: item.product.supplier,
            paymentTransactionId: transactionId,
            ...req.body
        })
        
    })
    
    res.status(200).json({
        success:true,
        message:"Sipariş Oluşturuldu."
    })

})
const getCart = asyncHandlerWrapper(async(req, res, next)=> {
    const cart = await Cart.findOne({customer: req.user.id}).populate([
        {path:"items", select:"product stock items", populate:{path:"product", select:"slug categories image name supplier", populate:[{path:"supplier", select:"shopName slug"},{path:"categories", select:"name"}]}},
        {path:"items", select:"stock", populate:{path:"stock", select:"color size price"}}
    ]);
    res.status(200)
    .json({
        success:true,
        data: cart
    })
})
const updateCart = asyncHandlerWrapper(async(req, res,next) => {
    const {id} = req.params;
 
    await Cart.findByIdAndUpdate(id,{
        ...req.body
    },{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        message:"cart updated"
    })
})

module.exports = {
    addToCart,
    applyCart,
    getCart,
    updateCart
}
//63fbaf706955fce1040c2a4b - 63fcd6806cc7e91af13bb085
//63fcf813992e38f9ebf362de - 63fcf848992e38f9ebf362ee
//63fcfc3f992e38f9ebf36318 - 63fcfc72992e38f9ebf3632e