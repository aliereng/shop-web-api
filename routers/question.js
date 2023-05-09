const express = require("express");
const { getAccessToRoute, getCustomerAccess } = require("../middlewares/authorization/auth");
const {addQuestion} = require("../controllers/question")
const router = express.Router();


router.post("/add", [getAccessToRoute, getCustomerAccess], addQuestion)

module.exports = router;