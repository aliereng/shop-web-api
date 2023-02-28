const express = require("express");
const {getAllTrancactions} = require("../controllers/transaction")
const {getAccessToRoute, getCustomerAccess} = require("../middlewares/authorization/auth")
const router = express.Router();


router.post("/apply", [getAccessToRoute, getCustomerAccess], getAllTrancactions)
module.exports = router;