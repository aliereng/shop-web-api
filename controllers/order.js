const asyncErrorWrapper = require("express-async-handler");
const Order = require("../models/Order");
const { cancelPay, returnPay } = require("./payment");

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

const cancelOrder = asyncErrorWrapper(async(req, res, next)=> {
    const ids = req.body.ids;

    cancelPay(req.body.info).then(async iyzicoResponse => {
        ids.map(async orderId => {
            await Order.findOneAndUpdate({_id:orderId}, {
                orderStatus: true,
                cancel: true
            })
        })
        res.status(200).json({success: true, message:"siparişler iptal edildi"})
    }).catch(err=> {
        res.status(400).json({success: false, message: err})

    })

})
const createReturn = asyncErrorWrapper(async (req, res, next) => {
    await Order.findByIdAndUpdate(req.body.orderId, {
        orderStatus: true,
        cancel: false,
        returnStatus: "request",
        shipper: req.body.shipper,
        boxCOunt: req.body.boxCount,
        returnReason: req.body.returnReason,
        followCode: req.body.followCode,
        ip: req.body.ip
    })
    res.status(200).json({success:true})


})
const completeReturnOrder = asyncErrorWrapper(async (req, res, next) => {
    if(req.body.returnStatus == "apply"){
        returnPay(req.body.info).then(async iyzicoResponse => {
            await Order.findByIdAndUpdate(req.body.orderId, {
                returnStatus : "apply"
            })
           res.status(200).json({success: true, data: iyzicoResponse})

        }).catch(err=> {
            res.status(200).json({success: true, data: err})

        });

    }else{
        await Order.findByIdAndUpdate(req.body.orderId, {
            returnStatus : "cancel"
        })
        res.status(400).json({success: false, data: "iade reddedildi."})

    }

})

module.exports = {
    getAllOrders,
    getOrderByCustomer,
    cancelOrder,
    createReturn,
    completeReturnOrder
}
