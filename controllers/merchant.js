const asyncHandlerWrapper = require("express-async-handler")
const CustomError = require("../helpers/error/CustomError")
const Supplier = require("../models/Supplier")
const Transaction = require("../models/Transaction")
const Order = require("../models/Order")
const Product = require("../models/Product")
const Stock = require("../models/Stock")
const getAllSuppliers = asyncHandlerWrapper(async (req, res, next) => {
    const suppliers = await Supplier.find();
    res.status(200).json({
        success: true,
        data: suppliers
    })
})
const getTransaction = asyncHandlerWrapper(async (req, res, next) => {
    Transaction.find({ supplier: req.user.id }).populate({
        path: "order", populate: [
            { path: "product", select: "name" },
            { path: "stock", select: "size color price" },
            {
                path: "deliveredAddress", select: "addressTitle, address", populate: {
                    path: "user", model: "Customer", select: "name surname email phone"
                }
            },
            {
                path: "invoiceAddress", select: "addressTitle, address", populate: {
                    path: "user", model: "Customer", select: "name surname email phone"
                }
            }
        ]
    }
    ).then(result => {
        res.status(200)
            .json({ data: result })
    })
        .catch(err => {
            return next(new CustomError(err, 500))
        })


})
const updateTransaction = asyncHandlerWrapper(async (req, res, next) => {
    const transaction = await Transaction.findById(req.body.transactionId);
    await Order.findByIdAndUpdate(transaction.order, {
        ...req.body
    }, {
        new: true,
        runValidators: true,
        rawResult: true
    })
    res.status(200).json({
        success: true
    })

})
const updateStock = asyncHandlerWrapper(async (req, res, next) => {
    const { productId, stockId } = req.body

    const product = await Product.findById(productId).populate({ path: "stocks", select: "size type status" });
    if (req.body.type == "base") {
        const stocks = await Stock.find({ product: productId });
        stocks.map(async stock => {
            await Stock.findByIdAndUpdate(stock, {
                type: "other",
            }, {
                new: true,
                runValidators: true
            })
        })

    }
    const stock = await Stock.findByIdAndUpdate(stockId, {
        ...req.body
    }, {
        new: true,
        runValidators: true
    })
    product.price = stock.price;
    product.size = stock.size;
    product.color = stock.color;
    product.image = stock.image
    product.save();
    res.status(200).json({
        data: stock
    })

})
const deleteStock = asyncHandlerWrapper(async (req, res, next) => {
    const { productId, stockId } = req.body;
    const stock = await Stock.findById(stockId);
    const product = await Product.findById(productId);
    if (stock.type == "base") {
        await Stock.findByIdAndRemove(stockId);
        setTimeout(async() => {
            const stock = await Stock.findOneAndUpdate({product: productId}, {
                type:"base"
            }, {
                new: true,
                runValidators: true
            })
            product.price = stock.price;
            product.size = stock.size;
            product.color = stock.color;
            product.image = stock.image
            await product.save();

        }, 1000);

    } else {
        await Stock.findByIdAndRemove(stockId);
    }
    res.status(200).json({
        success: true
    })
})

module.exports = {
    getTransaction,
    updateTransaction,
    getAllSuppliers,
    updateStock,
    deleteStock
}