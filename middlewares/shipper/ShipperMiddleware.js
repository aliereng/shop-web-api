const { v4: uuidv4 } = require('uuid');
const createReturnFollowCode = (req, res, next)=> {
    req.body.followCode = "rfc-" + uuidv4().slice(0, 12);
    next();
}

module.exports = {
    createReturnFollowCode
}