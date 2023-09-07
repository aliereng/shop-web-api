const express = require("express")
const {getAccessToRoute, getAdminAccess, getCustomerAccess} = require("../middlewares/authorization/auth")
const {getAllOrders, getOrderByCustomer, cancelOrder, refundPayCustomer} = require("../controllers/order")
const router = express.Router();


router.get("/", [getAccessToRoute, getAdminAccess], getAllOrders)
router.get("/user", [getAccessToRoute, getCustomerAccess], getOrderByCustomer)
router.post("/cancel", getAccessToRoute, cancelOrder)
router.post("/refund-request", getAccessToRoute, refundPayCustomer);
module.exports = router;