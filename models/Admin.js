const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken")
const CustomError = require("../helpers/error/CustomError")
const AdminSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "kullanıcı email alanı boş bırakılamaz"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "uygun olmayan mail format"]
    },
    password: {
        type:String,
        required:true,
        select: false
    }
})

AdminSchema.pre("save", function(next){
    if(!this.isModified("password")){
        next();
    }

    bcrypt.genSalt(10, (err,salt)=>{
        
        if(err) return next(new CustomError(err, 500));

        bcrypt.hash(this.password, salt, (err, hash)=> {
            if(err) return next(new CustomError(err, 500));

            this.password = hash;
            next()
        })
    })
})
AdminSchema.methods.generateJwtToken = function(){
    const payload = {
        id: this._id,
        username: this.username
    }
    const token = jwt.sign(payload, process.env.SCREET_KEY, {
        expiresIn: process.env.EXPIRE_IN
    })
    return token
}

module.exports = mongoose.model("Admin", AdminSchema)