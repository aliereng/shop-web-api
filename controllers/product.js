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
    const supplierId = req.supplier.id;
    
    await Product.create({
        ...req.body
    })
    res.status(200)
    
});

module.exports = {
    getAllProducts,
    addProduct
}