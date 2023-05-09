const mongoose = require("mongoose");

const QuestionModel = new mongoose.Schema({

    title: {
        type: String,
        required:[true,"question title alanı boş bırakılamaz"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    customer:{
        type: mongoose.Schema.ObjectId,
        ref:"Customer"
    },
    supplier:{
        type: mongoose.Schema.ObjectId,
        ref:"Supplier"
    },
    product:{
        type: mongoose.Schema.ObjectId,
        ref:"Product"
    },
    answer:{
        type: mongoose.Schema.ObjectId,
        ref:"Answer"
    }   
})

module.exports = mongoose.model("Question", QuestionModel);