const asyncHandlerWrapper = require("express-async-handler");
const Address = require("../models/Address")
const getById = asyncHandlerWrapper(async (req, res, next) => {
    const {id} = req.params
    const address = await Address.findById(id)
    res.status(200).json({
        success:true,
        data:address
    })
})

const getByUserAddress = asyncHandlerWrapper(async (req, res, next) => {
    const addresses = await Address.find({user:req.user.id})
    res.status(200).json({
        success:true,
        data:addresses
    })
})
const updateById = asyncHandlerWrapper(async (req, res, next) => {
    const {id} = req.params
    await Address.findByIdAndUpdate(id,{
        user: req.user.id,
        ...req.body
    },{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true
    })
})
const add = asyncHandlerWrapper(async (req, res, next) =>{
    console.log(req.body)
    const address = await Address.create({
        user: req.user.id,
        ...req.body
    });
    res.status(200)
    .json({
        data: address
    })
})
const deleteAddressById = asyncHandlerWrapper(async (req,res,next)=> {
    const {addressId} = req.params
    await Address.findByIdAndDelete(addressId);
    res.status(200).json({
        success: true,
        message: "Address delete operation success"
    })
})
const deleteAllAddresses = asyncHandlerWrapper(async (req, res, next)=> {
    await Address.deleteMany();
    res.status(200).json({
        success: true
    })
})


module.exports ={
    getById,
    add,
    getByUserAddress,
    deleteAddressById,
    updateById,
    deleteAllAddresses
}