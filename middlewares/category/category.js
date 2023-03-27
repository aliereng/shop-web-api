const expressAsyncHandler = require("express-async-handler");
const Category = require("../../models/Category")
const getCategoryIdBySlugName = expressAsyncHandler(async (req,res,next) => {
    
    const {slug} = req.params;
    const category = await Category.findOne({slug});
    req.categoryId = category._id;
    next()
    
})

module.exports = {
    getCategoryIdBySlugName
}