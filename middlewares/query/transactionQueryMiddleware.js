const asyncHandlerWrapper = require("express-async-handler");
const {sortHelper, populateHelper, paginationHelper, completeHelper} = require("./queryMiddlewareHelper");

const transactionQueryMiddleware = function(model, options){
    return asyncHandlerWrapper(async function(req,res,next){
        let queryResults;
        const {supplierId, transactionId} = req.params;
        let query;
        if (supplierId){
            query = model.find().where({supplier:supplierId})
        }else if(transactionId){
            query = model.findById(transactionId);
        }else{
            query = model.find();
        }
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
        if(transactionId){
            res.queryResults={
                success: true,
                data: queryResults
            }
        }else{
            res.queryResults = {
                success: true,
                totalPageCount: Math.ceil(total/ queryResults.length),
                total: total,
                count: queryResults.length,
                pagination: pagination,
                data: queryResults
            }
        }
        next(); 
    })
}

module.exports = {
    transactionQueryMiddleware
}