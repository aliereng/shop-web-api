
const searchHelper = (searchKey, query, req) => {
    //
    if (req.query.search) {
        const searchObject = {};
        const regex = RegExp(req.query.search, "i");
        searchObject[searchKey] = regex;
        return query.where(searchObject);
    }
    return query;
}
const colorHelper = function (query, req) {
    const { color } = req.query;
    if (color != null) {
        return query.where({"color":color})
        // return Product.find({"stocks.color":color})
    }
    return query
}
const populateHelper = (query, population) => {
    if (Array.isArray(population)) {
        population.map(item => {
            if (Array.isArray(item)) {
                this.populateHelper(query, item)
            }
            query.populate(item)
            // console.log(item)
        })
    }
    query.populate(population)
    return query;
}
const sortHelper = function (query, req) {
    const sortKey = req.query.sortBy
    if (sortKey === "newest") {
        return query.sort("-createdAt") //- büyükten güçüğe
    }

    if (sortKey === "oldest") {
        return query.sort("createdAt")
    }

    if (sortKey === "cheap") {
        return query.sort("price")
    }
    if (sortKey === "expensive") {
        return query.sort("-price")
    }
    if (sortKey === "most") {
        return query.sort("-totalLikeCount")
    }
    if (sortKey === "least") {
        return query.sort("totalLikeCount")
    }

    return query.sort("-createdAt")

}
const completeHelper = function (query, req) {

    const completeStatus = req.query.complete;
    if (completeStatus == "true") {
        return query.where({ "complete": true })
    } else if (completeStatus == "false") {
        return query.where({ "complete": false })
    } else {
        return query
    }
}
const priceHelper = function (query, req) {
    const { max, min } = req.query;
    if (max != null && min != null) {
        return query.where('price').gte(min).lte(max)
    }
    return query
}

const paginationHelper = async (total, query, req) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    // 1 2 3 4 5 6 7 8 9 10
    // skip(2) -> 3 4 5 6 7 8 9 10
    // limit(2) -> 3 4

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const pagination = {};

   
    if (startIndex > 0) {
        pagination.previous = {
            page: page - 1,
            limit: limit
        }
    }
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit: limit
        }
    }
    return {
        query: query === undefined ? undefined : query.skip(startIndex).limit(limit),
        pagination: pagination,
        startIndex,
        limit

    }

}
const questionQuerySeperator = async function (req, model) {
    let { product_id, merchant_id } = req.params
    let { all, answered } = req.query
    
    if (req.user && req._parsedOriginalUrl.pathname.includes("customer")) {
        switch (answered){
            case "false":
                return {
                    query: model.find({ customer: req.user.id }).where({answer: {$eq:null}}),
                    total: await model.find({ customer: req.user.id }).where({answer: {$eq:null}}).countDocuments()
                }
            case "true":
                return {
                    query: model.find({ customer: req.user.id }).where({answer: {$ne:null}}),
                    total: await model.find({ customer: req.user.id }).where({answer: {$ne:null}}).countDocuments()
                }
            default:
                return {
                    query:model.find({ customer: req.user.id }),
                    total: await model.find({ customer: req.user.id }).countDocuments()
                }
        }
       

    }

    if (req.user && req._parsedOriginalUrl.pathname.includes("merchant")) {

        switch (answered){
            case "false":
                return {
                    query:model.find({ supplier: req.user.id }).where({answer: {$eq:null}}),
                    total: await model.find({ supplier: req.user.id }).where({answer: {$eq:null}})
                }
            case "true":
                return {
                    query:model.find({ supplier: req.user.id }).where({answer: {$ne:null}}),
                    total: await model.find({ supplier: req.user.id }).where({answer: {$ne:null}})
                }
            default:
                return {
                    query: model.find({ supplier: req.user.id }),
                    total: await model.find({ supplier: req.user.id }).countDocuments()
                }
        }
    }
    if (!merchant_id) {
        return {
            query:model.find({ product: product_id }).where({ answer: { $ne: null } }),
            total: await model.find({ product: product_id }).where({ answer: { $ne: null } }).countDocuments()
        }
    }
    if (all == "true") {

        return {
            query: model.find({ supplier: merchant_id }),
            total: await model.find({ supplier: merchant_id }).countDocuments()
        }
    } else {
        return {
            query:model.find({ supplier: merchant_id }).where({ $and: [{ product: { $eq: product_id } }, { answer: { $ne: null } }] }),
            total: await model.find({ supplier: merchant_id }).where({ $and: [{ product: { $eq: product_id } }, { answer: { $ne: null } }] }).countDocuments()
        }
    }
    
    
}

module.exports = {
    searchHelper,
    paginationHelper,
    populateHelper,
    sortHelper,
    priceHelper,
    colorHelper,
    completeHelper,
    questionQuerySeperator
}