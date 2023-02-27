const express = require("express");
const { addToCart} = require("../controllers/cart");
const {getAccessToRoute, getCustomerAccess} = require("../middlewares/authorization/auth")
const router = express.Router();

router.use([getAccessToRoute, getCustomerAccess])

router.post("/addtocart", addToCart)
// router.get("/applycart" , applyCart)

module.exports = router