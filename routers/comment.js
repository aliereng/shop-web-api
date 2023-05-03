const express = require("express");
const {getAccessToRoute, getCustomerAccess,getCommentOwnerAccess} = require("../middlewares/authorization/auth");
const {add, getAll, getAllById, deleteAll, likeComment, deleteById} = require("../controllers/comments");

const {commentQueryMiddleware} = require("../middlewares/query/commentQueryMiddleware");
const Comment = require("../models/Comment");
const router = express.Router();



router.get("/", getAll)
router.get("/:id", commentQueryMiddleware(Comment, options={
    population: {path:"customer", select:"name surname"}
    
}), getAllById)
router.post("/add/:id",[getAccessToRoute, getCustomerAccess], add);
router.put("/like/:id", [getAccessToRoute, getCustomerAccess], likeComment);
router.delete("/delete/:id", [getAccessToRoute, getCustomerAccess,getCommentOwnerAccess], deleteById)
router.delete("/", deleteAll)
module.exports = router;