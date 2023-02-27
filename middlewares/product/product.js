const asyncHandlerWrapper = require("express-async-handler");
const CustomError = require("../../helpers/error/CustomError");
const Stock = require("../../models/Stock")
const existStock = asyncHandlerWrapper( async (req,res, next) => {
    const stocks = await Stock.find({product: req.query.product_id});
    const stock = req.body;
    stocks.map(res => {
        if(res.size == stock.size  && res.color == stock.color){
            return next(new CustomError("stok daha önce oluşturulmuş.", 401))
        }
    })
    next()
})

module.exports = {
    existStock
}