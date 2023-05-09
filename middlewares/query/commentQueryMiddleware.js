const asyncHandlerWrapper = require("express-async-handler");
const { sortHelper, paginationHelper, populateHelper } = require("./queryMiddlewareHelper");
const commentQueryMiddleware = function (model, options) {
    return asyncHandlerWrapper(async function (req, res, next) {
        let queryResults;
        let query;
        let total;
        let { type } = req.query
        if (req._parsedOriginalUrl.pathname.includes("customer")) {
            if (type == "supplier") {
                console.log("supplier çalıştı")
                query = model.find({ customer: req.user.id }).where({ supplier: { $ne: null } });
            } else if (type == "product") {
                query = model.find({ customer: req.user.id }).where({ product: { $ne: null } });

            } else {
                query = model.find({ customer: req.user.id });
                total = await model.find({ customer: req.user.id }).countDocuments();
            }
        } else {
            const { id } = req.params
            query = model.find({ product: id });
            total = await model.find({ product: id }).countDocuments();
        }
        query = sortHelper(query, req);
        if (options && options.population) {
            query = populateHelper(query, options.population);
        }
        const paginationResult = await paginationHelper(total, query, req);
        query = paginationResult.query;
        const pagination = paginationResult.pagination;
        queryResults = await query;
        res.queryResults = {
            success: true,
            totalPageCount: Math.ceil(total / queryResults.length),
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