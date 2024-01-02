const asyncHandlerWrapper = require("express-async-handler");

const Admin = require("../models/Admin")

const getAllAdmins = asyncHandlerWrapper(async(req, res,next)=> {
    // const admins = await Admin.find();
    res.status(200).json(res.queryResults)
})
const deleteAllAdmins = asyncHandlerWrapper(async(req, res, next)=>{
    await Admin.deleteMany();
    res.status(200).json({
        success: true
    })
})
const deleteAdminById = asyncHandlerWrapper(async (req, res, next) => {
    const {adminId} = req.params;
    await Admin.findByIdAndDelete(adminId);

    res.status(200).json({
        success: true,
        message: "This admin deleted."
    })
})
const updateAdminById = asyncHandlerWrapper(async (req, res, next) => {

    // gönderilen id ya da isteği yapan adminin kendi id bilgisine göre güncelleme işlemi yapar.
    // geriye success (boolean) ve message (string) değeri döndürür.

    const id = req.params.adminId || req.user.id;
    await Admin.findByIdAndUpdate(id, {
       ...req.body
    }, {
        runValidators:true,
        new: true
    })
    res.status(200).json({
        success: true,
        message: "This admin updated."
    })
})

module.exports = {
    deleteAllAdmins,
    deleteAdminById,
    updateAdminById,
    getAllAdmins
}

