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
const deleteAllShippers = asyncHandlerWrapper(async (req, res, next)=> {
    await Shipper.deleteMany();
    res.status(200).json({
        success:true
    })
})
const deleteShipperById = asyncHandlerWrapper(async(req, res, next)=> {
    const {shipperId} = req.params;
    await Shipper.findByIdAndDelete(shipperId);
    res.status(200).json({
        success: true,
        message: "Shipper delete operation success"
    })
})


module.exports = {
    add, getAll,
    deleteAllShippers,
    deleteShipperById
}