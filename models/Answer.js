const mongoose = require("mongoose");

const AnswerModel = new mongoose.Schema({

    title: {
        type: String,
        required:[true,"question title alanı boş bırakılamaz"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    question:{
        type:mongoose.Schema.ObjectId,
        ref:"Question"
    }
})

module.exports = mongoose.model("Answer", AnswerModel);