const asyncErrorWrapper = require("express-async-handler");
const Order = require("../models/Order");

const getAllOrders = asyncErrorWrapper(async (req, res, next) => {
    const orders = await Order.find();
    res.status(200).json({
        success:true,
        data: orders
    })
})
const getOrderByCustomer = asyncErrorWrapper(async (req, res, next)=> {
    const orders = await Order.find({customer:req.user.id}).populate([
        {path:"product", select:"name slug"},
        {path:"stock", select:"image size color price"},
        {path:"supplier", select:"shopName slug"},
        {path:"shipper", select:"name"},
        {path:"deliveredAddress", select:"title info"},
        {path:"invoiceAddress", select:"title info"}
    ])

    res.status(200).json({
        success:true,
        data:orders
    })
})


module.exports = {
    getAllOrders,
    getOrderByCustomer
}