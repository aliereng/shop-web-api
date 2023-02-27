const asyncHandlerWrapper = require("express-async-handler")
const {sendJwtToCLient} = require("../../helpers/auth/tokenHelpers");
const {validateInputs, comparePassword} = require("../../helpers/login/loginHelpers");
const CustomError = require("../../helpers/error/CustomError")

const Customer = require("../../models/Customer");
const Cart = require("../../models/Cart");

const register = asyncHandlerWrapper(async (req, res, next) => {
    const customer = await Customer.create({
        ...req.body
    })
    sendJwtToCLient(customer, res);
})
const login = asyncHandlerWrapper(async (req, res, next) => {
    const {email, password} = req.body;
    if(!validateInputs(email, password)){
        return next( new CustomError("e-posta ya da şifre eksik", 401));
    }
    const customer = await Customer.findOne({email}).select("+password");
    if(!comparePassword(password, customer.password)){
        return next(new CustomError("hatalı parola", 401))
    }
    sendJwtToCLient(customer, res);
})
const update = asyncHandlerWrapper(async (req, res, next)=>{
        
    const {customer_id} = req.params;
    
    const customer = await Customer.findByIdAndUpdate(customer_id,{...req.body},{
        new: true,
        runValidators: true
    })
    res.status(200).
    json({
        data: customer
    })
    
});

const deleteCustomerById = asyncHandlerWrapper(async (req, res, next)=> {
    const {customer_id} = req.params
    
    const customer = await Customer.findById(customer_id);
    customer.remove();
    res.status(200)
        .json({
            message: "başarılı"
        })
})
const deleteAllCustomer = asyncHandlerWrapper(async (req, res, next)=> {
    await Customer.deleteMany();
    await Cart.deleteMany();
    res.status(200)
        .json({
            message: "başarılı"
        })
})

module.exports = {
    register,
    login,
    update,
    deleteCustomerById,
    deleteAllCustomer

}