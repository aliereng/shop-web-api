const asyncHandlerWrapper = require("express-async-handler");
const {searchHelper,populateHelper, sortHelper, paginationHelper, priceHelper, colorHelper} = require("./queryMiddlewareHelper")
const questionQueryMiddleware = function(model, options){
    return asyncHandlerWrapper(async(req, res, next)=> {
        let queryResults;
        let total;
        let {product_id, merchant_id} = req.query
        let query;
        console.log(product_id, merchant_id)
        if(true){
            query = model.find({supplier: merchant_id}).where({product: {$eq:product_id}})
            total =  await query.countDocuments();
        }else{
            query = query.find({supplier: merchant_id})
            total =  await query.countDocuments();
        }
        const paginationResult =  await paginationHelper(total, query, req)
        query = paginationResult.query;
        const pagination = paginationResult.pagination;
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