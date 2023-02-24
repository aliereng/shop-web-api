const mongoose = require("mongoose");

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
    slug: String,
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
    score: Number,
    followers: Number,
    resetPasswordToken: String,
    resetPasswordExpire: Date

})

module.exports = mongoose.model("Supplier", SupplierModel)