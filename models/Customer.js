const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Cart = require("./Cart");
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
    identifyNumber: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date
})
CustomerModel.pre("save", function (next) {
   
    if (!this.isModified("password")) {
        next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err)
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err);
            this.password = hash;
            next();
        });
    });
})
CustomerModel.post("save", async function(){
    await Cart.create({
        customer : this._id
    })
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