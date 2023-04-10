
const asyncHandlerWrapper = require("express-async-handler");

const Stock = require("../models/Stock")
const Product = require("../models/Product")
const getStockFromProductByColor = asyncHandlerWrapper(async(req, res, next)=> {
    const {product_id} = req.params
    const {color} = req.query
    const stocks = await Stock.find({product:product_id}).where({color:color})
    res.status(200).json({
        success:true,
        data: stocks
    })
})
const addImagesThisStock = asyncHandlerWrapper(async (req, res, next) => {
    const files = [] 
    const stock = await Stock.findById(req.query.stockId);

    const product = await Product.findById(stock.product);
    if(req.files.length != 0){
        stock.removeOtherPictures(stock._id, stock.images);
    }

    if(Array.isArray(req.files)){
        req.files.map(file=> {
            files.push(file.filename)
        })
        stock.images = files;
        stock.save();
    }
    if(stock.type == "base"){
        product.images = files;
        product.save();
    }
        
    res.status(200).json({
        success: true,
        data: stock
    })
})
const updateStock = asyncHandlerWrapper(async (req, res, next)=> {
    const {stockId} = req.query
    const stock = await Stock.findByIdAndUpdate(stockId, {...req.body},{new:true, runValidators:true});
    const product = await Product.findById(stock.product);

    if(stock.type=="base"){
        product.image = stock.image;
        product.images = stock.images;
        product.size = stock.size;
        product.color = stock.color;
        product.price = stock.price
        product.save();
    }
    res.status(200).json({
        success:true,
        data: stock
    })
})
module.exports = {
    getStockFromProductByColor,
    addImagesThisStock,updateStock
}