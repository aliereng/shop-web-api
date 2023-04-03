const jwt= require("jsonwebtoken");
const asyncErrorWrapper = require("express-async-handler");
const Customer = require("../../models/Customer");
const Supplier = require("../../models/Supplier");
const Admin = require("../../models/Admin");
const Product = require("../../models/Product");
const CustomError = require("../../helpers/error/CustomError");
const {isTokenIncluded, getTokenFromHeader} = require("../../helpers/auth/tokenHelpers");

const getAccessToRoute = (req, res, next) => {
    if( !isTokenIncluded(req) ) {

        return next(new CustomError("giriş yapınız", 401))

    }
    const accessToken = getTokenFromHeader(req);
    jwt.verify(accessToken, process.env.SCREET_KEY, (err, decoded) => {
        if(err) {

            return next(new CustomError("giriş yapın", 401))

        }

        req.user = {
            ...decoded
        }
        next();
    })


}
const getAdminAccess =  asyncErrorWrapper(async (req, res, next) => {

    const admin = await Admin.findById(req.user.id);
    if(admin == null){
        return next(new CustomError("yetkisiz işlem - admin",403))
    }
    next()

})
const getSupplierAccess =  asyncErrorWrapper(async (req, res, next) => {

    const supplier = await Supplier.findById(req.user.id);
    if(supplier == null){
        return next(new CustomError("yetkisiz işlem - supplier",403))
    }
    next()

})
const getCustomerAccess =  asyncErrorWrapper(async (req, res, next) => {

    const customer = await Customer.findById(req.user.id);
    if(customer == null){
        return next(new CustomError("yetkisiz işlem - customer",403))
    }
    next()

})

const getProductOwnerAccess = asyncErrorWrapper(async (req, res, next) => {

    const userId = req.user.id;
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if(product.supplier != userId){
        return next(new CustomError("bu ürün üzerinde işlem yapma yetkiniz yok", 403))
    }
    next()

})
// const getModel = asyncErrorWrapper(async (req, res,next) => {
    
// })

module.exports= {
    getAccessToRoute,getSupplierAccess,
    getCustomerAccess, getProductOwnerAccess,
    getAdminAccess
}