const asyncHandlerWrapper = require("express-async-handler")
const { sendJwtToCLient } = require("../helpers/auth/tokenHelpers");
const { validateInputs, comparePassword } = require("../helpers/login/loginHelpers")
const CustomError = require("../helpers/error/CustomError")
const Supplier = require("../models/Supplier")
const Transaction = require("../models/Transaction")
const Order = require("../models/Order")

const getAllSuppliers = asyncHandlerWrapper(async (req, res, next) => {
    const suppliers = await Supplier.find();
    res.status(200).json({
        success: true,
        data: suppliers
    })
})
const register = asyncHandlerWrapper(async (req, res, next) => {
    const supplier = await Supplier.create({
        ...req.body
    })
    sendJwtToCLient(supplier, res);
})
const login = asyncHandlerWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    if (!validateInputs(email, password)) {
        return next(new CustomError("e-posta ya da şifre eksik", 401));
    }
    const supplier = await Supplier.findOne({ email }).select("+password");
    if (!comparePassword(password, supplier.password)) {
        return next(new CustomError("hatalı parola", 401))
    }
    sendJwtToCLient(supplier, res);
})
const forgotPassword = asyncHandlerWrapper(async(req, res, next) => {
    const confirmEmail = req.body.email;
    const supplier = await Supplier.findOne({email: confirmEmail});
    if(!supplier) {
        return next(new CustomError("girilen email bilgisi ile eşleşen hesap bulunamadı", 400))
    }
    const resetPasswordToken = supplier.getResetPasswordTokenFromUser();
    
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
        supplier.resetPasswordExpire = undefined;
        supplier.resetPasswordToken = undefined;
        await customer.save();
        return next(new CustomError("mail gönderilemedi. hata: "+ error, 500))
    }
})

const resetPassword = asyncHandlerWrapper(async(req, res, next) => {
    const {resetPasswordToken} = req.query;
    const {password} = req.body;
    const supplier = await Supplier.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    })
 
    if(!supplier) {
        return next(new CustomError("süresi dolmuş ya da geçersiz token", 400))
    }
    supplier.password = password;
    custosuppliermer.resetPasswordExpire = undefined;
    custosuppliermer.resetPasswordToken = undefined;
    await supplier.save();
    res.status(200).send("parola değiştirme işlemi başarılı")
})
const getTransaction = asyncHandlerWrapper(async (req, res, next) => {
    Transaction.find({ supplier: req.user.id }).populate({
        path: "order", populate:[
            { path: "product", select: "name" },
            { path: "stock", select: "size color price" },
            { path: "deliveredAddress", select:"addressTitle, address", populate:{
                path:"user", model:"Customer", select:"name surname email phone"
            } },
            { path: "invoiceAddress", select:"addressTitle, address", populate:{
                path:"user", model:"Customer", select:"name surname email phone"
            }  }
    ]}
    ).then(result => {
        res.status(200)
            .json({ data: result })
    })
        .catch(err => {
            return next(new CustomError(err, 500))
        })


})
const updateTransaction = asyncHandlerWrapper(async (req, res, next) => {
    const transaction = await Transaction.findById(req.body.transactionId);
    await Order.findByIdAndUpdate(transaction.order, {
        ...req.body
    }, {
        new: true,
        runValidators: true,
        rawResult: true
    })
    res.status(200).json({
        success:  true
    })
    
})

module.exports = {
    register,
    login,
    getTransaction,
    updateTransaction,
    resetPassword,
    forgotPassword,
    getAllSuppliers
}