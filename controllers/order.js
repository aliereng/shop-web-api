const asyncErrorWrapper = require("express-async-handler");
const Order = require("../models/Order");
const Iyzipay = require("iyzipay");

const iyzipay = new Iyzipay({
    apiKey: "your api key",
    secretKey: "your secret key",
    uri: "https://sandbox-api.iyzipay.com",
});

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
const returnPayment = asyncErrorWrapper(async(req, res, next)=> {
    const orderId = req.params.id;
    await Order.findByIdAndUpdate(orderId, {
        cancel : true,
        complete: true
    });
    res.status(200).json({
        success: true
    })
})
const cancelOrder = asyncErrorWrapper(async(req, res, next)=> {
    const ids = req.body.ids;
    iyzipay.cancel.create(req.body.info, (err, result)=> {
        if(result.status == "success"){
            
            ids.map(async orderId => {
                await Order.findOneAndUpdate({_id:orderId}, {
                    complete: true,
                    cancel: true
                })
            })
            res.status(200).json({
                success: true,
                data: result,
            });
        }else{
            res.status(400).json({
                success: false,
                data: "bir hata oluştu",
            });
        }

        
    })
    
})


module.exports = {
    getAllOrders,
    getOrderByCustomer,
    cancelOrder
}