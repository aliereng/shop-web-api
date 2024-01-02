const asyncHandlerWrapper = require("express-async-handler")
const Category = require("../models/Category");
const Properties = require("../models/Properties")
const getAllCategory = asyncHandlerWrapper(async (req, res, next) => {
    const categories = await Category.find().populate([{ path: "children", select: "parentId name slug children" ,populate:{path:"children", select: "parentId name slug children" ,populate:{path:"children", select: "parentId name slug children"}}}, {path:"properties", select:"property results"}]);
    // const categories = await Category.find().populate([
    //     {path:"children" ,select:"name parentId slug children properties"},
        
    // ]);
    res.status(200)
        .json({
            success: true,
            data: categories
        })
})
const getCategoryById = asyncHandlerWrapper(async (req, res, next) => {
    const { id } = req.params
    const category = await Category.findById(id).populate([
        { path: "children", select: "name" },
        { path: "properties", select:"property results"}
    ]);

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
const deleteCategoryById = asyncHandlerWrapper(async (req, res, next) => {
    const { categoryId } = req.params
    await Category.findByIdAndDelete(category_id)
    res.status(200).json({
        success: true
    })

});
const deleteAllCategory = asyncHandlerWrapper(async (req, res, next) => {
    await Category.deleteMany();
    res.status(200).json({
        success: true
    })
})

const addPropToThisCategory = asyncHandlerWrapper(async (req, res, next) => {
    const { categoryId } = req.params;
    const {properties} = req.body
    if(Array.isArray(properties)){
        properties.map(async property => {
            await Properties.create({
                categoryId,
                ...property
            })
        })
    }
    res.status(200).json({
        success: true
    })

})

module.exports = {
    getAllCategory,
    getCategoryById,
    add,
    update,
    deleteCategoryById,
    deleteAllCategory,
    addPropToThisCategory
}