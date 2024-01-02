const asyncHandlerWrapper = require("express-async-handler");
const Comment = require("../models/Comment");

const add = asyncHandlerWrapper(async (req, res, next) => {
    const {type} = req.query;
    const {id} = req.params
    let comment; 
    console.log(req.body)
    if(type=="Product"){
        comment = await Comment.create({
            product:id,
            customer: req.user.id,
            comment: req.body.comment,
            supplier: req.body.supplier,
            ...req.body
        })
    }
    if(type=="Supplier"){
        comment = await Comment.create({
            supplier:id,
            customer: req.user.id,
            comment: req.body.comment,
            ...req.body
        })
    }
    
    
    res.status(200).json({
        success:true,
        data: comment
    })
})
const getAll = asyncHandlerWrapper(async(req, res,next) => {
    const comments = await Comment.find().populate(
        {path:"customer", select:"name surname"},
    
        ).populate({path:"product", select:"name image"});
    res.status(200).json({
        success:true,
        data: comments
    })
})
const getAllById = asyncHandlerWrapper(async(req, res,next) => {
   
    res.status(200).json(res.queryResults)
})
const getCommentsByUserId = asyncHandlerWrapper(async(req, res, next)=> {
    res.status(200).json(res.queryResults)
})
const deleteAllComments = asyncHandlerWrapper(async(req, res, next)=> {
    await Comment.deleteMany();
    res.status(200).json(
        {
            success:true,
            message: "All comments deleted."
        }
    )
})
const deleteCommentById = asyncHandlerWrapper(async(req, res, next)=> {
    const {commentId} = req.params
    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({
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
const updateComment = asyncHandlerWrapper(async(req, res, next)=> {
    const {id} = req.params
    const comment = await Comment.findByIdAndUpdate(id,{
        createdAd:Date.now,
        ...req.body
    },{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        data:comment
    })
})
module.exports = {
    add,
    getAll,
    getAllById,
    getCommentsByUserId,
    deleteAllComments,
    deleteCommentById,
    likeComment,
    updateComment
}