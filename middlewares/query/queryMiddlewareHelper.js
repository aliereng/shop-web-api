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
const populateHelper = (query, population) => {
    query = query.populate(population)
    return query;
}
const sortHelper = function(query, req){
    const sortKey = req.query.sortBy
    if (sortKey === "newest") {
        return query.sort("-createdAt") //- büyükten güçüğe
    }

    if (sortKey === "oldest") {
        return query.sort("createdAt") 
    }

    if(sortKey === "cheap") {
        return query.sort("price")
    }
    if(sortKey === "expensive") {
        return query.sort("-price")
    }
   
    return query.sort("-createdAt")

}
const paginationHelper = async (total, query, req) =>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    // 1 2 3 4 5 6 7 8 9 10
    // skip(2) -> 3 4 5 6 7 8 9 10
    // limit(2) -> 3 4

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const pagination = {};
   

    if(startIndex>0) {
        pagination.previous = {
            page: page - 1,
            limit: limit
        }
    }
    if(endIndex< total){
        pagination.next = {
            page:  page + 1,
            limit: limit
        }
    }
    return {
        query:query === undefined? undefined : query.skip(startIndex).limit(limit),
        pagination: pagination,
        startIndex,
        limit

    }
    
}


module.exports = {
    searchHelper,
    paginationHelper,
    populateHelper,
    sortHelper
}