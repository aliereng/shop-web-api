const express = require("express");
const { deleteAllCustomer, getCustomer, getOrders, updateCustomerById} = require("../controllers/customer");
const {getOrderByCustomer} = require("../controllers/order")
const {getAccessToRoute, getCustomerAccess, getAdminAccess} = require("../middlewares/authorization/auth");
const { orderQueryMiddleware } = require("../middlewares/query/orderQueryMiddleware");
const Order = require("../models/Order");
const router = express.Router();

router.get("/", [getAccessToRoute, getCustomerAccess], getCustomer)

router.put("/update", [getAccessToRoute, getCustomerAccess], updateCustomerById)

// router.get("/transaction", [getAccessToRoute, getCustomerAccess], getTransaction)
router.delete("/deleteall/customers",[getAccessToRoute, getAdminAccess], deleteAllCustomer)
module.exports = router;
