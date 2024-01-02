const asyncErrorWrapper = require("express-async-handler");
const Order = require("../models/Order");
const { cancelPay, returnPay } = require("./payment");

const getAllOrders = asyncErrorWrapper(async (req, res, next) => {
    res.status(200).json(res.queryResults)

})
const getOrdersByCustomer = asyncErrorWrapper(async (req, res, next)=> {
    res.status(200).json(res.queryResults)
})
const getOrderById = asyncErrorWrapper(async(req, res,next)=> {
    res.status(200).json(res.queryResults);
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
const deleteAllOrders = asyncErrorWrapper(async (req, res, next) => {
    await Order.deleteMany();
    res.status(200).json({success:true, message: "All Orders deleted."})
})
const deleteOrderById = asyncErrorWrapper(async(req, res, next)=> {
    const {orderId} = req.params;
    await Order.deleteOrderById(orderId);
    res.status(200).json({
        success: true,
        message: "Order delete operation success"
    })
})
const updateOrderById = asyncErrorWrapper(async(req, res, next)=> {
    const {orderId} = req.params;
    const order = await Order.findByIdAndUpdate(orderId, {
        ...req.body
    }, {
        new: true,
        runValidators:true
    });
    res.status(200).json({
        success: true,
        data: order
    })
})

module.exports = {
    getAllOrders,
    getOrdersByCustomer,
    cancelOrder,
    createReturn,
    completeReturnOrder,
    getOrderById,
    deleteAllOrders,
    deleteOrderById,
    updateOrderById
}
