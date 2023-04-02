const express = require("express");
const { deleteAllCustomer, getCustomer, getOrders, update} = require("../controllers/customer");
const {getAccessToRoute, getCustomerAccess} = require("../middlewares/authorization/auth");
const router = express.Router();

router.get("/", [getAccessToRoute, getCustomerAccess], getCustomer)
router.get("/orders", [getAccessToRoute, getCustomerAccess], getOrders)
router.put("/update", [getAccessToRoute, getCustomerAccess], update)

// router.get("/transaction", [getAccessToRoute, getCustomerAccess], getTransaction)
router.delete("/deleteall", deleteAllCustomer)
module.exports = router;