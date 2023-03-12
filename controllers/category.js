const asyncHandlerWrapper = require("express-async-handler")
const Category = require("../models/Category")
const Brand = require("../models/Brand");
const SubCtaegory = require("../models/SubCtaegory");
const getAll = asyncHandlerWrapper(async (req, res, next)=>{
    const categories = await Category.find();

    res.status(200)
    .json({
        data: categories
    })
});

const add = asyncHandlerWrapper(async (req, res, next)=>{
    let {categories} = req.body;
    seperateCategory(categories);
    // let names = [];
    // let parents = [];
    // let currentCategories = await Category.find();
    
    // currentCategories.map(currentCategory => {
    //     names.push(currentCategory.name);
    //     parents.push(currentCategory.parentId)
    // })
    // categories.map(async (category, index)=> {
    //     if(!names.includes(category)){
    //         names = []
    //         await Category.create({
    //             parentId: categories[index-1],
    //             name:category
    //         })
    //     }
    //     // else if(names.includes(category) && !parents.includes(categories[index])){
    //     //     // names = []
    //     //     await Category.create({
    //     //         parentId: categories[index-1],
    //     //         name:category
    //     //     })
    //     // }
    // })
    // console.log(names)
    res.status(200).json({
        success:true 
    })
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