
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
    console.log(req.image)
    console.log(req.files)
    if(Array.isArray(req.files)){
        req.files.map(file=> {
            files.push(file.filename)
        })
        stock.images = files;
    }
    if(stock.type == "base"){
        product.images = files;
        product.save();
    }
    
    
    stock.save();
    
    res.status(200).json({
        success: true,
        data: stock
    })
})
module.exports = {
    getStockFromProductByColor,
    addImagesThisStock
}