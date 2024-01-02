const asyncHandlerWrapper = require("express-async-handler");
const Brand = require("../models/Brand");

const deleteAllBrands = asyncHandlerWrapper(async(req, res, next)=> {
    await Brand.deleteMany();
    res.status(200).json({
        success: true,
        message: "All brands deleted."
    })
})
const deleteBrandById = asyncHandlerWrapper(async(req, res, next)=>{
    const {brandId} = req.params;
    await Brand.findByIdAndDelete(brandId);
    res.status(200).json({
        success: true,
        message: "Delete answer operation success."
    })
})


module.exports = {
    deleteAllBrands,
    deleteBrandById
}