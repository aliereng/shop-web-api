const {populateHelper, colorHelper, priceHelper, sortHelper, paginationHelper} = require("./queryMiddlewareHelper");
const asyncHandlerWrapper = require("express-async-handler");

const stockQueryMiddleware = function(model, options){
    return asyncHandlerWrapper(async function(req, res, next) {
        let query = model.find();
        query = colorHelper(query, req);

        query = priceHelper(query, req);
        query = sortHelper(query, req);
        query = populateHelper(query, options.population);

    })
}