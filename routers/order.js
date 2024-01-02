const express = require("express")
const {getAccessToRoute, getAdminAccess, getCustomerAccess} = require("../middlewares/authorization/auth")
const {createReturnFollowCode} = require("../middlewares/shipper/ShipperMiddleware")
const {getAllOrders, getOrdersByCustomer, cancelOrder, createReturn, completeReturnOrder} = require("../controllers/order");
const { orderQueryMiddleware } = require("../middlewares/query/orderQueryMiddleware");
const Order = require("../models/Order");
const router = express.Router();


router.get("/", [getAccessToRoute, getAdminAccess], getAllOrders)
router.get("/user", [getAccessToRoute, getCustomerAccess, orderQueryMiddleware(Order, {
    population: [
        {path:"product", select:"name slug"},
        {path:"stock", select:"image size color price"},
        {path:"supplier", select:"shopName slug"},
        {path:"shipper", select:"name"},
        {path:"deliveredAddress", select:"title info"},
        {path:"invoiceAddress", select:"title info"}
    ]
})], getOrdersByCustomer)
router.post("/cancel", getAccessToRoute, cancelOrder)
router.post("/create-return", [getAccessToRoute,createReturnFollowCode], createReturn);
router.post("/complete-return", [getAccessToRoute], completeReturnOrder);

module.exports = router;