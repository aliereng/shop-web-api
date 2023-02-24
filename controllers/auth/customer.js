const asyncErrorWrapper = require("express-async-handler")
const {sendJwtToCLient} = require("../../helpers/auth/tokenHelpers")
const Customer = require("../../models/Customer")

const register = asyncErrorWrapper(async (req, res, next) => {
    const customer = await Customer.create({
        ...req.body
    })
    sendJwtToCLient(customer, res);
})

module.exports = {
    register
}