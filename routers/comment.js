const express = require("express");
const {getAccessToRoute, getCustomerAccess,getCommentOwnerAccess} = require("../middlewares/authorization/auth");
const {add, getAll, getAllById, deleteAll, likeComment, deleteById} = require("../controllers/comments");
const router = express.Router();



router.get("/", getAll)
router.get("/:id", getAllById)
router.post("/add/:id",[getAccessToRoute, getCustomerAccess], add);
router.put("/like/:id", [getAccessToRoute, getCustomerAccess], likeComment);
router.delete("/delete/:id", [getAccessToRoute, getCustomerAccess,getCommentOwnerAccess], deleteById)
router.delete("/", deleteAll)
module.exports = router;