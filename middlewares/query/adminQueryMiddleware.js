const expressAsyncHandler = require("express-async-handler")
const {populateHelper,sortHelper, paginationHelper} = require("./queryMiddlewareHelper");
const adminQueryMiddleware = function( model, options ){
    return expressAsyncHandler(async(req, res, next)=> {
        let query;
        let total;
        let pagination;
        const {adminId} = req.params;
        // admin id gönderilmesine ya da gönderilmemesine bakılarak find işlemi yapar ve ardından ilgili filtrelemeleri ve veya sayfalama işlemlerini yapıp res üzerinden veri döndürür.
        if(adminId){
            query = model.findById(adminId);
        }else{
            query = model.find();
            if(req.query.sortKey){
                query = sortHelper(query, req)
            }
            total = await model.countDocuments();
            const paginationResult = await paginationHelper(total, query, req);
            query = paginationResult.query;
            pagination = paginationResult.pagination;
        }
        if(options && options.population){
            query = populateHelper(query, options.population)
        }
        const queryResults = await query;
        if(adminId){
            res.queryResults = {
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
    adminQueryMiddleware
}