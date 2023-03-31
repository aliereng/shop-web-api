const asyncHandlerWrapper = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");
const {sendJwtToCLient} = require("../helpers/auth/tokenHelpers");
const sendEmail = require("../helpers/libraries/sendEmail");
const { controleAndReturnModel } = require("../helpers/auth/modelHelpers");
const {validateInputs, comparePassword} = require("../helpers/login/loginHelpers");

const register = asyncHandlerWrapper(async(req, res, next) => {
    const model = controleAndReturnModel(req.body.model);
    const user = await model.create({
        ...req.body
    })
    sendJwtToCLient(user, res)
})
const login = asyncHandlerWrapper(async(req, res, next) => {
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
const forgotPassword = asyncHandlerWrapper(async(req, res, next) => {
    const confirmEmail = req.body.email;
    const model = controleAndReturnModel(req.body.model);
    const user = await model.findOne({email: confirmEmail});
    if(!user) {
        return next(new CustomError("girilen email bilgisi ile eşleşen hesap bulunamadı", 400))
    }
    const resetPasswordToken = user.getResetPasswordTokenFromUser();
    
    const resetPasswordUrl= `http://localhost:4200/resetpassword?resetPasswordToken=${resetPasswordToken}`;
    // const resetPasswordUrl= `http://localhost:3000/api/resetpassword?resetPasswordToken=${resetPasswordToken}`;
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
        .json({
            success: true,
            message:"eposta adresinize sıfırlama maili gönderildi"
        })
    } catch (error) {
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;
        await user.save();
        return next(new CustomError("mail gönderilemedi. hata: "+ error, 500))
    }
})
const resetPassword = asyncHandlerWrapper(async(req, res, next) => {
    const model = controleAndReturnModel(req.body.model);
    const {resetPasswordToken} = req.query;
    const {password} = req.body;
    const user = await model.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    })
 
    if(!user) {
        return next(new CustomError("süresi dolmuş ya da geçersiz token", 400))
    }
    user.password = password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    res.status(200).json({
        success: true,
        message: "parola değiştirme işlemi başarılı."
    })
})

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword
}
//Bu bir denemedir