const express = require("express");
const { deleteAllCustomer, getCustomer, addAddress, getOrders} = require("../controllers/customer");
const {getAccessToRoute, getCustomerAccess} = require("../middlewares/authorization/auth");
const {register, login, forgotPassword, resetPassword } = require("../controllers/auth");
const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/addaddress", [getAccessToRoute, getCustomerAccess], addAddress)
router.post("/forgotpassword", forgotPassword)
router.post("/resetpassword", resetPassword)
router.get("/", [getAccessToRoute, getCustomerAccess], getCustomer)
router.get("/orders", [getAccessToRoute, getCustomerAccess], getOrders)

// router.get("/transaction", [getAccessToRoute, getCustomerAccess], getTransaction)
router.delete("/deleteall", deleteAllCustomer)
module.exports = router;