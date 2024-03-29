const asyncHandlerWrapper = require("express-async-handler")
const Customer = require("../models/Customer");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

const getAllCustomers = asyncHandlerWrapper(async(req, res, next)=> {
    res.status(200).json(res.queryResults)
})

const getCustomer = asyncHandlerWrapper(async (req, res, next) =>{
    res.status(200).json(res.queryResults)

})

const getOrders = asyncHandlerWrapper(async (req, res, next) =>{
    const orders = await Order.find({customer: req.user.id});
    res.status(200)
    .json({
        data: orders
    })
})
const updateCustomerById = asyncHandlerWrapper(async (req, res, next)=>{
    const {customerId} = req.params || req.user.id;
    const customer = await Customer.findByIdAndUpdate(customerId,{...req.body},{
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
    const {customerId} = req.params
    
    const customer = await Customer.findById(customerId);
    customer.remove();
    res.status(200)
        .json({
            message: "başarılı"
        })
})
const deleteAllCustomer = asyncHandlerWrapper(async (req, res, next)=> {
    await Customer.deleteMany();
    // await Cart.deleteMany();
    res.status(200)
        .json({
            message: "başarılı"
        })
})

module.exports = {
    updateCustomerById,
    deleteCustomerById,
    deleteAllCustomer,
    getCustomer,
    getOrders,
    getAllCustomers

}

