const asyncHandlerWrapper = require("express-async-handler")
const Category = require("../models/Category")

const getAllCategory = asyncHandlerWrapper(async (req, res, next) => {
    const categories = await Category.find();
    res.status(200)
        .json({
            success:true,
            data: categories
        })
})
const getCategoryById = asyncHandlerWrapper(async(req, res,next)=> {
    const {categoryId} = req.body
    const category = await Category.findById(categoryId).populate({path:"children", select:"name"});

    res.status(200).json({
        success: true, 
        data: category
    })
})

const add = asyncHandlerWrapper(async (req, res, next) => {
    let { name, parentId } = req.body;
    const category = await Category.create({
        parentId,
        name
    })
    if (parentId != null) {
        const parentCategory = await Category.findById(parentId);
        parentCategory.children.push(category?._id)
        await parentCategory.save();
    }
    res.status(200).json({
        success: true,
        data: category
    })
});
const update = asyncHandlerWrapper(async (req, res, next) => {
    const { category_id } = req.params
    const category = await Category.findByIdAndUpdate(category_id, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        data: category
    })

});
const remove = asyncHandlerWrapper(async (req, res, next) => {
    const { category_id } = req.params
    await Category.findByIdAndDelete(category_id)
    res.status(200).json({
        success: true
    })

});
const removeAll = asyncHandlerWrapper(async (req, res, next) => {
    await Category.deleteMany();
    res.status(200).json({
        success: true
    })
})


module.exports = {
    getAllCategory,
    getCategoryById,
    add,
    update,
    remove,
    removeAll
}