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
            query = model.find({supplier: merchant_id}).where({$and: [{product: {$eq:product_id}}, {answer: {$ne:null}}]})
        }
    
        if(!merchant_id){
            query = model.find({product: product_id}).where({answer:{$ne:null}})
        }
        if(req.user && req._parsedOriginalUrl.pathname.includes("customer")){
            query = model.find({customer: req.user.id})

        }
        if(req.user && req._parsedOriginalUrl.pathname.includes("merchant")){
            query = model.find({supplier: req.user.id})

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