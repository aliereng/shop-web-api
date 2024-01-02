const asyncErrorHandler = require("express-async-handler");
const {searchHelper,populateHelper, sortHelper, paginationHelper, priceHelper, colorHelper} = require("./queryMiddlewareHelper");

const orderQueryMiddleware = function(model, options){
    return asyncErrorHandler(async(req, res,next) => {
     
        const {orderId, customerId} = req.params
        const {cancel, returnStatus} = req.query
        let query;
        if(orderId){
            query = model.findById(orderId)
        }else if(customerId || req.user.model == "customer"){
            if(cancel || returnStatus){
                query = cancel? model.find({customer: customerId || req.user.id}).where({cancel}): model.find().where({returnStatus})
            }else{
                query = model.find({customer: customerId || req.user.id})
            }
        }
        else{
            if(cancel || returnStatus){
                query = cancel? model.find().where({cancel}): model.find().where({returnStatus})
            }else{
                query =model.find()
            }
        }
        if(options && options.population){
            query = populateHelper(query, options.population)
        } ;
        query = sortHelper(query, req)
        query = priceHelper(query,req)
     
        const total = await model.countDocuments();
        const paginationResult =  await paginationHelper(total, query, req)
        query = paginationResult.query;
        const pagination = paginationResult.pagination;
        
        queryResults = await query;
        
        if(orderId){
            res.queryResults= {
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
    orderQueryMiddleware
}