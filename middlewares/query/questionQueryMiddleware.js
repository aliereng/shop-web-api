const asyncHandlerWrapper = require("express-async-handler");
const {searchHelper,populateHelper, sortHelper, paginationHelper, priceHelper, colorHelper} = require("./queryMiddlewareHelper")
const questionQueryMiddleware = function(model, options){
    return asyncHandlerWrapper(async(req, res, next)=> {
        let queryResults;
        let total;
        let {product_id, merchant_id} = req.params
        let {all} = req.query
        let query;
        if(all == "true"){
            query = model.find({supplier: merchant_id})
        }else{
            query = model.find({supplier: merchant_id}).where({product: {$eq:product_id}})
        }
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