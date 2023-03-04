const express = require("express");
const { register, login, deleteAllCustomer, getCustomer, addAddress, getOrders} = require("../controllers/auth/customer");
const {getAccessToRoute, getCustomerAccess} = require("../middlewares/authorization/auth")
const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/addaddress", [getAccessToRoute, getCustomerAccess], addAddress)
router.get("/", [getAccessToRoute, getCustomerAccess], getCustomer)
router.get("/orders", [getAccessToRoute, getCustomerAccess], getOrders)

// router.get("/transaction", [getAccessToRoute, getCustomerAccess], getTransaction)
router.delete("/deleteall", deleteAllCustomer)
module.exports = router;