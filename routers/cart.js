const express = require("express");
const { addToCart, applyCart, getCart} = require("../controllers/cart");
const {getAccessToRoute, getCustomerAccess} = require("../middlewares/authorization/auth")
const router = express.Router();

router.use([getAccessToRoute, getCustomerAccess])

router.post("/addtocart", addToCart);
router.post("/apply", [getAccessToRoute, getCustomerAccess], applyCart)
router.get("/get", [getAccessToRoute, getCustomerAccess], getCart)

// router.get("/applycart" , applyCart)

module.exports = router