const mongoose = require("mongoose");
const sluqify = require("slugify")
const jwt = require("jsonwebtoken")
const Product = require("../models/Product");
const SupplierModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "sağlayıcı ad alanı boş bırakılamaz"]
    },
    surname: {
        type: String,
        required: [true, "sağlayıcı soyad alanı boş bırakılamaz"]
    },
    shopName: {
        type: String,
        required: [true, "sağlayıcı mağaza ad alanı boş bırakılamaz"]
    },
    email: {
        type: String,
        required: [true, "sağlayıcı email alanı boş bırakılamaz"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "uygun olmayan mail format"]
    },
    password: {
        type: String,
        required: [true, "sağlayıcı parola alanı boş bırakılamaz"],
        minlength: [6, "sağlayıcı parola alanı en az 6 karakter içermelidir"],
        select: false
    },
    phone: {
        type: String,
        required: [true, "sağlayıcı telefon alanı boş bırakılamaz"]
    },
    
    taxNumber: {
        type: String,
        required: [true, "satıcı vergi numara alanı boş bırakılamaz"]
    },
    products: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Product"
        }
    ],
    shippers:[
        {
            type: mongoose.Schema.ObjectId,
            ref: "Shipper"
        }
    ],
    slug: String,
    score: Number,
    followers: Number,
    resetPasswordToken: String,
    resetPasswordExpire: Date

})
SupplierModel.pre("save", function (next) {

    if (!this.isModified("shopName")) {
        next()
    }
    this.slug = this.makeSlug();
    next();

});
SupplierModel.methods.makeSlug = function () {
    return sluqify(this.shopName, {
        replacement: '-',  
        remove: /[*+~.()'"!:@]/g, 
        lower: true,     
        strict: false,    
        locale: 'vi',      
        trim: true    
    })
}
SupplierModel.methods.generateJwtToken = function(){
    const payload = {
        id: this._id,
        name: this.name,
        surname: this.surname,
        email: this.email,
        shopName: this.shopName
    }

    const token = jwt.sign(payload, process.env.SCREET_KEY, {
        expiresIn: process.env.EXPIRE_IN
    })
    return token
}


module.exports = mongoose.model("Supplier", SupplierModel)