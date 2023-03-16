const asyncHandlerWrapper = require("express-async-handler");

const Admin = require("../models/Admin")

const deleteAllAdmins = asyncHandlerWrapper(async(req, res, next)=>{
    await Admin.deleteMany();
    res.status(200).json({
        success: true
    })
})

module.exports = {
    deleteAllAdmins
}