const asyncHandlerWrapper = require("express-async-handler");
const {sortHelper, populateHelper, paginationHelper, completeHelper} = require("./queryMiddlewareHelper");

const transactionQueryMiddleware = function(model, options){
    return asyncHandlerWrapper(async function(req,res,next){
        let queryResults;
        let query = model.find({supplier:req.user.id})
        query = completeHelper(query, req);
        query = sortHelper(query, req)
        if(options && options.population){
            query = populateHelper(query, options.population);
        }
        
        const total = await model.find({supplier:req.user.id}).countDocuments();
        const paginationResult =  await paginationHelper(total, query, req)
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
    transactionQueryMiddleware
}