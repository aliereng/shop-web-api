const asyncHandlerWrapper = require("express-async-handler");
const Category = require("../models/Category");
const Product = require("../models/Product")
const Stock = require("../models/Stock")
const getAllProducts = asyncHandlerWrapper(async (req, res, next)=>{
    res.status(200).json(res.queryResults);
});
const getAllProductsBySupplier = asyncHandlerWrapper(async (req, res, next)=>{
    // const products = await Product.find({supplier: req.user.id}).populate("stocks", "size color piece price");

    // res.status(200)
    // .json({
    //     data: products
    // })
    res.status(200).json(res.queryResults);
});
const getProductsByCategory = asyncHandlerWrapper(async(req, res, next)=> {
    res.status(200).json(res.queryResults)
})
const getProductById = asyncHandlerWrapper(async (req,res,next)=> {
    const {id} = req.params
    const product = await Product.findById(id).populate([
        {path:"supplier", select:"shopName email phone"},
        {path:"categories", select:"name slug properties", populate:{path:"properties", select:"property"}},
        {path:"stocks", select:"size color piece price type"},
        {path:"comments" ,select:"comment createdAt customer totalLikeCount", populate:{path:"customer", select:"name surname"}}

    ]);
    res.status(200).json({
        success:true,
        data: product
    })
})
const addProduct = (async (req, res, next)=>{

    const product = await Product.create({
        supplier: req.user.id,
 
        ...req.body
    })

    product.save();
    res.status(200).
    json({
        success:true,
        data: product
    })
    
});


const update = asyncHandlerWrapper(async (req, res, next)=>{
        
    const {product_id} = req.params;
    
    const product = await Product.findByIdAndUpdate(product_id,{...req.body},{
        new: true,
        runValidators: true
    })

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
    update,
    deleteAllProduct,
    deleteProductById,
    getAllProductsBySupplier,
    getProductsByCategory,
    getProductById
}