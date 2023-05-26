const asyncHandlerWrapper = require("express-async-handler");
const {searchHelper,populateHelper, sortHelper, paginationHelper, priceHelper, colorHelper, questionQuerySeperator} = require("./queryMiddlewareHelper");
const Question = require("../../models/Question");
const questionQueryMiddleware = function(model, options){
    return asyncHandlerWrapper(async(req, res, next)=> {
        let queryResults;
        let total;
        let query = questionQuerySeperator(req, model)
        query = sortHelper(query, req)
        if(options && options.population){
            query = populateHelper(query, options.population);
        }
        total = await model.countDocuments();
        const paginationResult =  await paginationHelper(total, query, req);
        query = paginationResult.query;
        const pagination = paginationResult.pagination;
        queryResults = await query;
        res.queryResults = {
            success: true,
            totalPageCount: Math.ceil(total/ queryResults.length),
            total: total,
            count: queryResults.length,
            pagination: pagination,
            data: queryResults
        }
        next();
    })
}

module.exports = {
    questionQueryMiddleware
}