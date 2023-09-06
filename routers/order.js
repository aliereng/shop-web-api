const express = require("express")
const {getAccessToRoute, getAdminAccess, getCustomerAccess} = require("../middlewares/authorization/auth")
const {getAllOrders, getOrderByCustomer, cancelOrder} = require("../controllers/order")
const router = express.Router();


router.get("/", [getAccessToRoute, getAdminAccess], getAllOrders)
router.get("/user", [getAccessToRoute, getCustomerAccess], getOrderByCustomer)
router.post("/cancel", getAccessToRoute, cancelOrder)
module.exports = router;