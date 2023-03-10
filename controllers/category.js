const asyncHandlerWrapper = require("express-async-handler")

const Category = require("../models/Category")
const getAll = asyncHandlerWrapper(async (req, res, next)=>{
    const categories = await Category.find();

    res.status(200)
    .json({
        data: categories
    })
});
const add = asyncHandlerWrapper(async (req, res, next)=>{
   
    const category = await Category.create({
        ...req.body
    })
    res.status(200).json({
        success: true,
        data: category
    });
    
});
const update = asyncHandlerWrapper(async (req, res, next)=>{
    const {category_id} = req.params
    const category = await Category.findByIdAndUpdate(category_id, req.body,{
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        data: category
    })
    
});
const remove = asyncHandlerWrapper(async (req, res, next)=>{
    const {category_id} = req.params
    await Category.findByIdAndDelete(category_id)
    res.status(200).json({
        success: true
    })
    
});
const removeAll = asyncHandlerWrapper( async (req, res, next) => {
    await Category.deleteMany();
    res.status(200).json({
        success:true
    })
})


module.exports = {
    getAll,
    add,
    update,
    remove,
    removeAll
}