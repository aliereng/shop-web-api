const asyncHandlerWrapper = require("express-async-handler");

const Question = require("../models/Question");
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

module.exports = {
    getQuestions,
    addQuestion
}