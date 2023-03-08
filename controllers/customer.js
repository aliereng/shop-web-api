const asyncHandlerWrapper = require("express-async-handler")
const Customer = require("../models/Customer");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Address = require("../models/Address")

const getAllCustomers = asyncHandlerWrapper(async(req, res, next)=> {
    res.status(200).json(res.queryResults)
})

const getCustomer = asyncHandlerWrapper(async (req, res, next) =>{
    const customer = await Customer.findById(req.user.id);
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
const addAddress = asyncHandlerWrapper(async (req, res, next) =>{
    const address = await Address.create({
        userType: "Customer",
        user: req.user.id,
        ...req.body
    });
    res.status(200)
    .json({
        data: address
    })
})



const update = asyncHandlerWrapper(async (req, res, next)=>{
        
    const {customer_id} = req.params;
    
    const customer = await Customer.findByIdAndUpdate(customer_id,{...req.body},{
        new: true,
        runValidators: true
    })
    res.status(200).
    json({
        data: customer
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
    addAddress,
    getOrders,
    getAllCustomers

}