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
   
    await Category.create({
        ...req.body
    })
    res.status(200).send("tamamlandı");
    
});
const update = asyncHandlerWrapper(async (req, res, next)=>{
    const {category_id} = req.params
    await Category.findByIdAndUpdate(category_id, req.body,{
        new: true,
        runValidators: true
    })
    res.status(200)
    
});
const remove = asyncHandlerWrapper(async (req, res, next)=>{
    const {category_id} = req.params
    await Category.findByIdAndDelete(category_id)
    res.status(200)
    
});
const removeAll = asyncHandlerWrapper( async (req, res, next) => {
    await Category.deleteMany();
    res.status(200).send("tümü silindi")
})


module.exports = {
    getAll,
    add,
    update,
    remove,
    removeAll
}