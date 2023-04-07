const asyncHandlerWrapper = require("express-async-handler");
const Shipper = require("../models/Shipper")

const add = asyncHandlerWrapper(async (req, res, next) => {
    const shipper = await Shipper.create({
        ...req.body
    })
    res.status(200).json(
        { data: shipper }
    )

})
const getAll = asyncHandlerWrapper(async (req, res, next) => {
    const shippers = await Shipper.find()
    res.status(200).json(
        { data: shippers }
    )

})


module.exports = {
    add, getAll
}