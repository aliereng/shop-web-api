const express = require("express")
const {getAccessToRoute, getAdminAccess, getCustomerAccess} = require("../middlewares/authorization/auth")
const {createReturnFollowCode} = require("../middlewares/shipper/ShipperMiddleware")
const {getAllOrders, getOrderByCustomer, cancelOrder, createReturn, completeReturnOrder} = require("../controllers/order")
const router = express.Router();


router.get("/", [getAccessToRoute, getAdminAccess], getAllOrders)
router.get("/user", [getAccessToRoute, getCustomerAccess], getOrderByCustomer)
router.post("/cancel", getAccessToRoute, cancelOrder)
router.post("/create-return", [getAccessToRoute,createReturnFollowCode], createReturn);
router.post("/complete-return", [getAccessToRoute], completeReturnOrder);

module.exports = router;