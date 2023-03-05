const expressAsyncHandler = require("express-async-handler");
const { sendJwtToCLient } = require("../helpers/auth/tokenHelpers");
const CustomError = require("../helpers/error/CustomError");
const { validateInputs, comparePassword } = require("../helpers/login/loginHelpers");
const Admin = require("../models/Admin");

const register = expressAsyncHandler(async(req, res, next) => {
    const admin = await Admin.create({
        ...req.body
    })
    sendJwtToCLient(admin, res)
})
const login = expressAsyncHandler(async(req, res, next) => {
    const {username, password} = req.body;
    if(!validateInputs(username, password)){
        return next(new CustomError("kullanıcı adı - parola eksik", 401))
    }
    const admin = await Admin.findOne({username}).select("+password")
    if(!comparePassword(password, admin.password)){
        return next(new CustomError("hatalı parola", 401))
    }
    sendJwtToCLient(admin, res)
})


module.exports = {
    register,
    login
}