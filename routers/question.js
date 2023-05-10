const express = require("express");
const { getAccessToRoute, getCustomerAccess } = require("../middlewares/authorization/auth");
const { questionQueryMiddleware } = require("../middlewares/query/questionQueryMiddleware");
const {addQuestion, getQuestions} = require("../controllers/question");
const Question = require("../models/Question");
const router = express.Router();

router.get("/product/:product_id/merchant/:merchant_id", questionQueryMiddleware(Question, options={
    population: [
        {path:"product", select:"name image price"},
        {path:"supplier", select:"shopName"},
        {path:"customer", select:"name surname"}
    ]
}), getQuestions)
router.post("/add", [getAccessToRoute, getCustomerAccess], addQuestion)

module.exports = router;