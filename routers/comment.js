const express = require("express");
const {getAccessToRoute, getCustomerAccess,getCommentOwnerAccess, getSupplierAccess} = require("../middlewares/authorization/auth");
const {add, getAll, getAllById, deleteAllComments, likeComment, deleteCommentById, getCommentsByUserId,updateComment} = require("../controllers/comments");

const {commentQueryMiddleware} = require("../middlewares/query/commentQueryMiddleware");
const Comment = require("../models/Comment");
const router = express.Router();



router.get("/", getAll)
router.get("/customer", [getAccessToRoute, getCustomerAccess, commentQueryMiddleware(Comment, options={
    population: [
        {path:'product', select:'name __v'},
        {path:"stock",select:"image color size"},
        {path:"supplier", select:"shopName"}
    ]
})], getCommentsByUserId)
router.get("/merchant", [getAccessToRoute, getSupplierAccess, commentQueryMiddleware(Comment, options={
    population: [
        {path:'product', select:'name __v'},
        {path:"stock",select:"image color size"}
        
    ]
})], getCommentsByUserId)
router.get("/:id", commentQueryMiddleware(Comment, options={
    population: {path:"customer", select:"name surname"}
    
}), getAllById)

router.post("/add/:id",[getAccessToRoute, getCustomerAccess], add);
router.put("/like/:id", [getAccessToRoute, getCustomerAccess], likeComment);
router.delete("/delete/:commentId", [getAccessToRoute, getCustomerAccess], deleteCommentById)
router.put("/update/:id", [getAccessToRoute, getCustomerAccess], updateComment)
router.delete("/", deleteAllComments)
module.exports = router;