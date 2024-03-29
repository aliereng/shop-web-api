const asyncHandlerWrapper = require("express-async-handler");

const Question = require("../models/Question");
const Answer = require("../models/Answer");
const getQuestions = asyncHandlerWrapper(async(req, res, next)=> {
    res.status(200).json(res.queryResults)
})
const addQuestion = asyncHandlerWrapper(async(req, res, next)=> {
    const question = await Question.create({
        customer: req.user.id,
        ...req.body
    })
    res.status(200).json({
        success: true,
        data: question
    })
})
const updateQuestion = asyncHandlerWrapper(async(req, res, next)=> {
    const {question_id} = req.query;
    const question = await Question.findByIdAndUpdate(question_id,{
        ...req.body
    },{
        new:true,
        runValidators:true
    });

    res.status(200).json({
        success:true,
        data: question
    })

})

const likeQuestion = asyncHandlerWrapper(async(req, res, next)=> {
    const {question_id} = req.params;
    const {like} = req.query;
    const question = await Question.findByIdAndUpdate(question_id,{
        likeCount: parseInt(like)
    },{
        new:true,
        runValidators:true
    });

    res.status(200).json({
        success:true,
        data: question
    })

})
const deleteQuestionById = asyncHandlerWrapper(async(req, res, next)=>{
    const {id} = req.params;
    const question = await Question.findById(id);
    await Answer.findByIdAndRemove(question.answer);
    await Question.findByIdAndRemove(id);
    res.status(200).json({
        success:true
    })
})
const notAnsweredCount = asyncHandlerWrapper(async(req, res, next)=> {
    const result = await Question.find({supplier:req.user.id}).where({answer:{$eq:null}}).countDocuments();
    res.status(200).json({
        success:true,
        data: result
    })
})
const deleteAllQuestions = asyncHandlerWrapper(async (req, res, next) => {
    await Question.deleteMany();
    res.status(200).json({
        success: true,
        message: "All questions deleted."
    })
})
module.exports = {
    getQuestions,
    addQuestion,
    updateQuestion,
    likeQuestion,
    deleteQuestionById,
    notAnsweredCount,
    deleteAllQuestions
}