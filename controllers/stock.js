
const asyncHandlerWrapper = require("express-async-handler");

const Stock = require("../models/Stock")
const getStockFromProductByColor = asyncHandlerWrapper(async(req, res, next)=> {
    const {product_id} = req.params
    const {color} = req.query
    const stocks = await Stock.find({product:product_id}).where({color:color})
    res.status(200).json({
        success:true,
        data: stocks
    })
})

module.exports = {
    getStockFromProductByColor
}