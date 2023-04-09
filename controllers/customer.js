const asyncHandlerWrapper = require("express-async-handler")
const Customer = require("../models/Customer");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

const getAllCustomers = asyncHandlerWrapper(async(req, res, next)=> {
    res.status(200).json(res.queryResults)
})

const getCustomer = asyncHandlerWrapper(async (req, res, next) =>{
    const customer = await Customer.findById(req.user.id).select("+password");
    res.status(200)
    .json({
        data: customer
    })
})
const getOrders = asyncHandlerWrapper(async (req, res, next) =>{
    const orders = await Order.findOne({customer: req.user.id});
    res.status(200)
    .json({
        data: orders
    })
})
const update = asyncHandlerWrapper(async (req, res, next)=>{
    const customer = await Customer.findByIdAndUpdate(req.user.id,{...req.body},{
        new: true,
        runValidators: true
    })
    if(req.body.password){
        customer.password = req.body.password;
        customer.save()
    }
    
    res.status(200).
    json({
        success:true,
        message: "Güncelleme işlemi Tamamlandı"
    })
    
});

const deleteCustomerById = asyncHandlerWrapper(async (req, res, next)=> {
    const {customer_id} = req.params
    
    const customer = await Customer.findById(customer_id);
    customer.remove();
    res.status(200)
        .json({
            message: "başarılı"
        })
})
const deleteAllCustomer = asyncHandlerWrapper(async (req, res, next)=> {
    await Customer.deleteMany();
    await Cart.deleteMany();
    res.status(200)
        .json({
            message: "başarılı"
        })
})

module.exports = {
    update,
    deleteCustomerById,
    deleteAllCustomer,
    getCustomer,
    getOrders,
    getAllCustomers

}