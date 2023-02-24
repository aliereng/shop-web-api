const asyncHandlerWrapper = require("express-async-handler")

const Product = require("../models/Product")
const getAllProducts = asyncHandlerWrapper(async (req, res, next)=>{
    const products = await Product.find();

    res.status(200)
    .json({
        data: products
    })
});
const addProduct = asyncHandlerWrapper(async (req, res, next)=>{
        
    const product = await Product.create({
        supplier : req.user.id,
        ...req.body
        
    })
    res.status(200).
    json({
        data: product
    })
    
});

module.exports = {
    getAllProducts,
    addProduct
}