const asyncHandlerWrapper = require("express-async-handler")
const {sendJwtToCLient} = require("../helpers/auth/tokenHelpers");
const {validateInputs, comparePassword} = require("../helpers/login/loginHelpers");
const CustomError = require("../helpers/error/CustomError")
const sendEmail = require("../helpers/libraries/sendEmail")
const Customer = require("../models/Customer");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Address = require("../models/Address")

const getAllCustomers = asyncHandlerWrapper(async(req, res, next)=> {
    res.status(200).json(res.queryResults)
})
const register = asyncHandlerWrapper(async (req, res, next) => {
    const customer = await Customer.create({
        ...req.body
    })
    sendJwtToCLient(customer, res);
})
const getCustomer = asyncHandlerWrapper(async (req, res, next) =>{
    const customer = await Customer.findById(req.user.id);
    res.status(200)
    .json({
        data: customer
    })
})
const getOrders = asyncHandlerWrapper(async (req, res, next) =>{
    const orders = await Order.findOne({customer: req.user.id});
    res.status(200)
    .json({
        data: orders
    })
})
const addAddress = asyncHandlerWrapper(async (req, res, next) =>{
    const address = await Address.create({
        userType: "Customer",
        user: req.user.id,
        ...req.body
    });
    res.status(200)
    .json({
        data: address
    })
})
const forgotPassword = asyncHandlerWrapper(async(req, res, next) => {
    const confirmEmail = req.body.email;
    const customer = await Customer.findOne({email: confirmEmail});
    if(!customer) {
        return next(new CustomError("girilen email bilgisi ile eşleşen hesap bulunamadı", 400))
    }
    const resetPasswordToken = customer.getResetPasswordTokenFromUser();
    
    const resetPasswordUrl= `http://localhost:3000/api/customer/resetpassword?resetPasswordToken=${resetPasswordToken}`;
    const emailTemplate = `
        <h2>Reset Your Password</h2>
        <p>This <a href='${resetPasswordUrl}' target='_blank'>link</a> will expire in 1 hour.</p>
    `;
    
    try {
        
        await sendEmail({
            from: process.env.SMTP_USER,
            to: confirmEmail,
            subject:"Reset Password",
            html: emailTemplate
        })
        res.status(200)
        .send("eposta adresinize sıfırlama maili gönderildi")
    } catch (error) {
        customer.resetPasswordExpire = undefined;
        customer.resetPasswordToken = undefined;
        await customer.save();
        return next(new CustomError("mail gönderilemedi. hata: "+ error, 500))
    }
})

const resetPassword = asyncHandlerWrapper(async(req, res, next) => {
    const {resetPasswordToken} = req.query;
    const {password} = req.body;
    const customer = await Customer.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    })
 
    if(!customer) {
        return next(new CustomError("süresi dolmuş ya da geçersiz token", 400))
    }
    customer.password = password;
    customer.resetPasswordExpire = undefined;
    customer.resetPasswordToken = undefined;
    await customer.save();
    res.status(200).send("parola değiştirme işlemi başarılı")
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
    deleteAllCustomer,
    getCustomer,
    addAddress,
    getOrders,
    forgotPassword,
    resetPassword,
    getAllCustomers

}