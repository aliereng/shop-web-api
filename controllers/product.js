const asyncHandlerWrapper = require("express-async-handler")

const Product = require("../models/Product")
const Stock = require("../models/Stock")
const getAllProducts = asyncHandlerWrapper(async (req, res, next)=>{
    res.status(200).json(res.queryResults)
});
const getAllProductsBySupplier = asyncHandlerWrapper(async (req, res, next)=>{
    const products = await Product.find({supplier: req.user.id}).populate("stocks", "size color piece price");

    res.status(200)
    .json({
        data: products
    })
});
const addProduct = asyncHandlerWrapper(async (req, res, next)=>{
    
    const product = await Product.create({
        supplier: req.user.id,
        ...req.body
    })
    product.stocks.push(await Stock.create({
        product: product._id,
        ...req.body
    }));
    product.save();
   
    res.status(200).
    json({
        data: product
    })
    
});
const createStockAndAddProduct = asyncHandlerWrapper(async (req,res,next) =>{
    const {product_id}  = req.query
    
    const product = await Product.findById(product_id).populate({path:"stocks", select: "size type status"});
    const stocks = await Stock.find({product: product_id});
    
    if(req.body.type == "base"){
        stocks.map(async stock => {
            await Stock.findByIdAndUpdate(stock,{
                type: "other"
            },{
                new:true,
                runValidators:true
            })
        })
        product.price = req.body.price;
        product.size = req.body.size;
        product.color = req.body.color;
    }
    const stock = await Stock.create({
        product: product_id,
        ...req.body
    })
    product.stocks.push(stock);
    product.save();
    res.status(200).json({
        data: product
    })
})
const update = asyncHandlerWrapper(async (req, res, next)=>{
        
    const {product_id} = req.params;
    
    const product = await Product.findByIdAndUpdate(product_id,{...req.body},{
        new: true,
        runValidators: true
    })
    if(req.body.stocks){
       await Stock.findOneAndUpdate({product:product_id}, {
        size: req.body.stocks
       },{
        new:true
       })
    }
    res.status(200).
    json({
        data: product
    })
    
});

const deleteProductById = asyncHandlerWrapper(async (req, res, next)=> {
    const {product_id} = req.params
    
    const product = await Product.findById(product_id);
    product.remove();
    res.status(200)
        .json({
            message: "başarılı"
        })
})
const deleteAllProduct = asyncHandlerWrapper(async (req, res, next)=> {
    await Product.deleteMany();
    await Stock.deleteMany();
    res.status(200)
        .json({
            message: "başarılı"
        })
})

module.exports = {
    getAllProducts,
    addProduct,
    createStockAndAddProduct,
    update,
    deleteAllProduct,
    deleteProductById,
    getAllProductsBySupplier
}