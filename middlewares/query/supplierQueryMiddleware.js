const expressAsyncHandler = require("express-async-handler");
const { paginationHelper } = require("./queryMiddlewareHelper");

const supplierQueryMiddleware = function(model, options){
    return expressAsyncHandler(async function(req, res, next){
        let query;
        const {supplierId} = req.params;
        if(supplierId){
            query = model.findById(supplierId)
        }else{
            query = model.find();
        }
        const total = await model.countDocuments();
        const paginationResult = await paginationHelper(total, query, req);
        query = paginationResult.query;
        const pagination = paginationResult.pagination;
        const queryResults = await query;
        if(supplierId || req.user.model == "supplier"){
            req.queryResults = {
                success: true,
                data: queryResults
            }
        }else{
            req.queryResults = {
                success: true,
                totalPageCount: Math.ceil(total / queryResults.length),
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
    supplierQueryMiddleware
}