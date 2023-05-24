const mongoose = require("mongoose");

const QuestionModel = new mongoose.Schema({
    title: {
        type: String,
        required:[true,"soru metni boş bırakılamaz"]
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
    },
    likeCount: {
        type:Number,
        default:0
    }
});

QuestionModel.pre("findOneAndDelete", async function() {
    if(this.answer){
        console.log(this.answer)
        // await Answer.findByIdAndRemove(this.answer)
    }
    console.log("pre metot")
    
})

module.exports = mongoose.model("Question", QuestionModel);