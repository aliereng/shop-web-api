const asyncHandlerWrapper = require("express-async-handler")
const {sendJwtToCLient} = require("../../helpers/auth/tokenHelpers");
const { validateInputs, comparePassword } = require("../../helpers/login/loginHelpers")
const CustomError = require("../../helpers/error/CustomError")
const Supplier = require("../../models/Supplier")
const Transaction = require("../../models/Transaction")

const register = asyncHandlerWrapper(async (req, res, next) => {
    const supplier = await Supplier.create({
        ...req.body
    })
    sendJwtToCLient(supplier, res);
})
const login = asyncHandlerWrapper(async (req, res, next) => {
    const {email, password} = req.body;
    if(!validateInputs(email, password)){
        return next( new CustomError("e-posta ya da şifre eksik", 401));
    }
    const supplier = await Supplier.findOne({email}).select("+password");
    if(!comparePassword(password, supplier.password)){
        return next(new CustomError("hatalı parola", 401))
    }
    sendJwtToCLient(supplier, res);
})

const getTransaction = asyncHandlerWrapper(async (req, res, next) =>{
    const transaction = await Transaction.find({supplier: req.user.id})
    
    res.status(200)
    .json({
        data: transaction
    })
})
// const updateTransactions = asyncHandlerWrapper(async(req, res, next)=>{
// })

module.exports = {
    register,
    login,
    getTransaction
}