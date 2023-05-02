const asyncHandlerWrapper = require("express-async-handler");
const Comment = require("../models/Comment");
const Product = require("../models/Product");
const Supplier = require("../models/Supplier");
const add = asyncHandlerWrapper(async (req, res, next) => {
    const {type} = req.query;
    const {id} = req.params
    let comment
   
    comment = await Comment.create({
        commentType:type,
        commentRef:id,
        customer: req.user.id,
        comment: req.body.comment
    })
    
    res.status(200).json({
        success:true,
        data: comment
    })
})
const getAll = asyncHandlerWrapper(async(req, res,next) => {
    const comments = await Comment.find().populate(
        {path:"customer", select:"name surname"}).populate({path:"customer", select:"name surname"});
    res.status(200).json({
        success:true,
        data: comments
    })
})
const getAllById = asyncHandlerWrapper(async(req, res,next) => {
    const {id} = req.params
    const comments = await Comment.find({commentRef:id}).populate(
        {path:"customer", select:"name surname"}).populate({path:"customer", select:"name surname"});
    res.status(200).json({
        success:true,
        data: comments
    })
})
const deleteAll = asyncHandlerWrapper(async(req, res, next)=> {
    await Comment.deleteMany();
    res.status(200).json(
        {
            success:true
        }
    )
})
const deleteById = asyncHandlerWrapper(async(req, res, next)=> {
    const {id} = req.params
    await Comment.findByIdAndDelete(id);
    res.send(200).json({
        success: true
    })
})
const likeComment = asyncHandlerWrapper(async(req,res,next)=> {
    const {id} =req.params
    const {like} = req.query
    const comment = await Comment.findByIdAndUpdate(id,{
        totalLikeCount: like
    }, {
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        data: comment
    })
})
module.exports = {
    add,
    getAll,
    getAllById,
    deleteAll,
    deleteById,
    likeComment
}