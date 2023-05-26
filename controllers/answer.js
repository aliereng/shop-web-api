const asyncHandlerWrapper = require("express-async-handler");
const Answer = require("../models/Answer");
const Question = require("../models/Question");

const addAnswer = asyncHandlerWrapper(async(req, res, next)=> {
    
    const answer = await Answer.create({
        question:req.body.question,
        title: req.body.title
    })
    const question = await Question.findById(req.body.question);
    question.answer = answer._id;
    question.save();
    res.status(200).json({
        success: true,
        data: answer
    })
})
const updateAnswer = asyncHandlerWrapper(async(req, res, next)=> {
    const {id} = req.params
    const answer = await Answer.findByIdAndUpdate(id,{
        createdAt: Date.now(),
        ...req.body
    },{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success: true,
        data: answer
    })
})
const deleteAnswer = asyncHandlerWrapper(async(req, res, next)=> {
    const {id} = req.params
    const answer = await Answer.findById(id);
    const question = await Question.findById(answer.question);
    question.answer = null;
    question.save();
    answer.remove();
    res.status(200).json({
        success: true
    })
})

module.exports = {
    addAnswer,
    updateAnswer,
    deleteAnswer
}