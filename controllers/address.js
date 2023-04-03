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
const removeById = asyncHandlerWrapper(async (req,res,next)=> {
    const {id} = req.params
    await Address.findByIdAndDelete(id);
    res.status(200).json({
        success: true
    })
})


module.exports ={
    getById,
    add,
    getByUserAddress,
    removeById,
    updateById
}