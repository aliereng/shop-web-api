const asyncHandlerWrapper = require("express-async-handler");
const Shipper = require("../models/Shipper")

const addShipper = asyncHandlerWrapper(async (req, res, next)=> {
   const shipper =  await Shipper.create({
    ...req.body
   })
   res.status(200).json({data:shipper})

})


module.exports = {
    addShipper
}