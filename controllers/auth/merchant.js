const asyncErrorWrapper = require("express-async-handler")
const {sendJwtToCLient} = require("../../helpers/auth/tokenHelpers")
const Supplier = require("../../models/Supplier")

const register = asyncErrorWrapper(async (req, res, next) => {
    const supplier = await Supplier.create({
        ...req.body
    })
    sendJwtToCLient(supplier, res);
})

module.exports = {
    register
}