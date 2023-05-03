const asyncHandlerWrapper = require("express-async-handler");
const {sortHelper, paginationHelper, populateHelper} = require("./queryMiddlewareHelper");
const commentQueryMiddleware = function(model, options){
    return  asyncHandlerWrapper(async function(req,res,next){
        let queryResults;
        const {id} = req.params
        let query = model.find({commentRef:id});

        query = sortHelper(query, req);
        if(options && options.population){
            query = populateHelper(query, options.population);
        }
        // if(req.query.like){
        //     console.log(req.query.like)
        //     if(req.query.like ==="most"){
        //        query = query.sort("-totalLikeCount")
        //     }else{
        //        query = query.sort("totalLikeCount")
        //     }
        // }
        const total = await model.find({commentRef:id}).countDocuments();
        const paginationResult = await paginationHelper(total, query, req);
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
    commentQueryMiddleware
}