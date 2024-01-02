const express = require("express");
const { getAccessToRoute, getCustomerAccess } = require("../middlewares/authorization/auth");
const { questionQueryMiddleware } = require("../middlewares/query/questionQueryMiddleware");
const {addQuestion, getQuestions, updateQuestion,likeQuestion, deleteQuestionById,notAnsweredCount} = require("../controllers/question");
const Question = require("../models/Question");
const router = express.Router();

router.get("/customer", [getAccessToRoute, questionQueryMiddleware(Question, options= {
    population: [
        {path:"product", select:"name image price"},
        {path:"supplier", select:"shopName"},
        {path:"customer", select:"name surname"},
        {path:"answer", select:"title createdAt"}
    ]
})],getQuestions)
router.get("/merchant", [getAccessToRoute, questionQueryMiddleware(Question, options= {
    population: [
        {path:"product", select:"name image price"},
        {path:"customer", select:"name surname"},
        {path:"answer", select:"title createdAt"}

    ]
})],getQuestions)

router.get("/product/:product_id", questionQueryMiddleware(Question, options={
    population: [
        {path:"product", select:"name image price"},
        {path:"supplier", select:"shopName"},
        {path:"customer", select:"name surname"},
        {path:"answer", select:"title createdAt"}

    ]
}), getQuestions)
router.get("/product/:product_id/merchant/:merchant_id", questionQueryMiddleware(Question, options={
    population: [
        {path:"product", select:"name image price"},
        {path:"supplier", select:"shopName"},
        {path:"customer", select:"name surname"},
        {path:"answer", select:"title"}
    ]
}), getQuestions)
router.get("/notansweredcount", getAccessToRoute, notAnsweredCount)
router.post("/add", [getAccessToRoute, getCustomerAccess], addQuestion)
router.put("/update/:question_id", [getAccessToRoute, getCustomerAccess], updateQuestion)
router.put("/like/:question_id", likeQuestion)
router.delete("/delete/:questionId", deleteQuestionById)
module.exports = router;