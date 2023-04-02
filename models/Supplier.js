const mongoose = require("mongoose");
const sluqify = require("slugify")
const jwt = require("jsonwebtoken")
const Product = require("../models/Product");
const bcrypt = require("bcryptjs");
const Transaction = require("./Transaction");
const Shipper = require("../models/Shipper")

const SupplierModel = new mongoose.Schema({
    name: {
        type: String
    },
    surname: {
        type: String
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
    if (!this.isModified("password") || !this.isModified("shopName")) {
        next();
    }
    this.slug = this.makeSlug();  
    if(this.isModified("password")){
        bcrypt.genSalt(10, (err, salt) => {
            if (err) next(err)
            bcrypt.hash(this.password, salt, (err, hash) => {
                
                if (err) next(err);
                this.password = hash;
                next();
            });
        });
    }
    
        
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
SupplierModel.methods.getResetPasswordTokenFromUser =  function() {
    const randomHexString = crypto.randomBytes(15).toString("hex");

    const resetPasswordToken = crypto
        .createHash("SHA256")
        .update(randomHexString)
        .digest("hex")
        
    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpire = Date.now() + parseInt(process.env.RESET_PASSWORD_EXPIRE) 
    this.save();
    return resetPasswordToken
}
SupplierModel.post("deleteMany", async function(){
    await Product.deleteMany();
    await Transaction.deleteMany();
    await Shipper.deleteMany();
})



module.exports = mongoose.model("Supplier", SupplierModel)