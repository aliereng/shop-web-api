
const asyncHandlerWrapper = require("express-async-handler");

const Stock = require("../models/Stock")
const Product = require("../models/Product")
const getStockFromProductByColor = asyncHandlerWrapper(async (req, res, next) => {
    const { product_id } = req.params
    const { color } = req.query
    const stocks = await Stock.find({ product: product_id }).where({ color: color })
    res.status(200).json({
        success: true,
        data: stocks
    })
})
const addImagesThisStock = asyncHandlerWrapper(async (req, res, next) => {
    const files = []
    const stock = await Stock.findById(req.query.stockId);

    const product = await Product.findById(stock.product);

    stock.removeOtherPictures(stock._id, stock.images);
    if (Array.isArray(req.files)) {
        req.files.map(file => {
            files.push(file.filename)
        })
        stock.images = files;
        stock.image = stock.images[0]
        console.log(stock.images[0])
        console.log(stock.image)
        stock.save();
    }



    if (stock.base) {
        product.images = files;
        product.image = files[0]
        product.save();
    }

    res.status(200).json({
        success: true,
        data: stock
    })
})
const updateStock = asyncHandlerWrapper(async (req, res, next) => {
    const { stockId } = req.query
    const stock = await Stock.findByIdAndUpdate(stockId, { ...req.body }, { new: true, runValidators: true });
    const product = await Product.findById(stock.product);

    if (req.body.base) {
        product.image = stock.image;
        product.images = stock.images;
        product.size = stock.size;
        product.color = stock.color;
        product.price = stock.price;
        // console.log(product.stocks)
        product.stocks.map(async prdStock => {
            // console.log(prdStock)
            if (prdStock != stockId) {
                await Stock.findByIdAndUpdate(prdStock, { base: false }, { new: true, runValidators: true })
            }
        })
        product.save();
    }
    res.status(200).json({
        success: true,
        data: stock
    })
})
const createStockAndAddProduct = asyncHandlerWrapper(async (req, res, next) => {
    const { product_id } = req.query
    const reqStockObject = JSON.parse(req.body.stock)
    const files = []
    if (Array.isArray(req.files)) {
        req.files.map(file => {
            files.push(file.filename)
        })
    }
    const stock = await Stock.create({ 
        product: product_id,
        images:files,
        image:files[0],
        ...reqStockObject
    });
    const product = await Product.findById(product_id)
    if (reqStockObject.base) {
        product.price = reqStockObject.price;
        product.size = reqStockObject.size;
        product.color = reqStockObject.color;
        product.images = files
        product.image = files[0]
    }
    product.stocks.push(stock)
    product.save();
    res.status(200).json({
        data: product
    })
})
module.exports = {
    getStockFromProductByColor,
    addImagesThisStock, updateStock,
    createStockAndAddProduct
}