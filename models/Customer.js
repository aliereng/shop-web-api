const mongoose = require("mongoose");

const CustomerModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "kullanıcı ad alanı boş bırakılamaz"]
    },
    surname: {
        type: String,
        required: [true, "kullanıcı soyad alanı boş bırakılamaz"]
    },
    email: {
        type: String,
        required: [true, "kullanıcı email alanı boş bırakılamaz"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "uygun olmayan mail format"]
    },
    password: {
        type: String,
        required: [true, "kullanıcı parola alanı boş bırakılamaz"],
        minlength: [6, "kullanıcı parola alanı en az 6 karakter içermelidir"],
        select: false
    },
    phone: {
        type: String,
        required: [true, "kullanıcı telefon alanı boş bırakılamaz"]
    },
    slug: String,
    addresses: {
        type: mongoose.Schema.ObjectId,
        ref: "Address"
    },
    cart: {
        type: mongoose.Schema.ObjectId,
        ref: "Cart"
    },
    transactions: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Transactions"
        }
    ],
    pastTrancactions: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Transactions"
        }
    ],
    identifyNumber: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

module.exports = mongoose.model("Customer", CustomerModel)