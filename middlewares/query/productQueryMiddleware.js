const asyncHandlerWrapper = require("express-async-handler");
const {searchHelper,populateHelper, sortHelper, paginationHelper, priceHelper, colorHelper} = require("./queryMiddlewareHelper")
const productQueryMiddleware = function(model, options){
    return asyncHandlerWrapper(async function(req,res,next){
        let queryResults;
        let query = model.find();
        if(req.categoryId) {
            query = model.find({categories: req.categoryId});
        }
        
        query = searchHelper("name", query, req);
        if(options && options.population){
            query = populateHelper(query, options.population);
        }
        query = sortHelper(query, req)
        query = priceHelper(query,req)
        query = colorHelper(query, req)
        const total = await model.countDocuments();
        const paginationResult =  await paginationHelper(total, query, req)
        query = paginationResult.query;
        const pagination = paginationResult.pagination;
        
        queryResults = await query.where({visible:true})
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
    productQueryMiddleware
}