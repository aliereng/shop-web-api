const mongoose = require("mongoose");

const AnswerModel = new mongoose.Schema({

    title: {
        type: String,
        required:[true,"answer title alanı boş bırakılamaz"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    question:String
})

// AnswerModel.post("save", async function(){
//     console.log(this.question)
//     const question  =  await Question.findOne({_id:this.question})
//     console.log(question)
// })

module.exports = mongoose.model("Answer", AnswerModel);