const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
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
CustomerModel.methods.generateJwtToken = function(){
    const payload = {
        id: this._id,
        name: this.name,
        surname: this.surname,
        email: this.email
    }

    const token = jwt.sign(payload, process.env.SCREET_KEY, {
        expiresIn: process.env.EXPIRE_IN
    })
    return token
}


module.exports = mongoose.model("Customer", CustomerModel)