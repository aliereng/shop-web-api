const expressAsyncHandler = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");
const {sendJwtToCLient} = require("../helpers/auth/tokenHelpers");
const { controleAndReturnModel } = require("../helpers/auth/modelHelpers");
const {validateInputs, comparePassword} = require("../helpers/login/loginHelpers");
const Admin = require("../models/Admin");
const Customer = require("../models/Customer");
const Supplier = require("../models/Supplier");
const register = expressAsyncHandler(async(req, res, next) => {
    const model = controleAndReturnModel(req.body.model);
    const user = await model.create({
        ...req.body
    })
    sendJwtToCLient(user, res)
})

const login = expressAsyncHandler(async(req, res, next) => {
    const model = controleAndReturnModel(req.body.model);
    const {email, password} = req.body;
    if(!validateInputs(email, password)){
        return next( new CustomError("e-posta ya da şifre eksik", 401));
    }
    const user = await model.findOne({email}).select("+password");
    if(!comparePassword(password, user.password)){
        return next(new CustomError("hatalı parola", 401))
    }
    sendJwtToCLient(user, res);
})

module.exports = {
    register,
    login
}