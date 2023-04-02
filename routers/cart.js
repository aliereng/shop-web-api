const express = require("express");
const { addToCart, applyCart, getCart, updateCart} = require("../controllers/cart");
const {getAccessToRoute, getCustomerAccess} = require("../middlewares/authorization/auth")
const router = express.Router();

router.use([getAccessToRoute, getCustomerAccess])

router.post("/addtocart", addToCart);
router.post("/complete", [getAccessToRoute, getCustomerAccess], applyCart)
router.get("/get", [getAccessToRoute, getCustomerAccess], getCart)
router.put("/apply/:id", [getAccessToRoute, getCustomerAccess], updateCart)

// router.get("/applycart" , applyCart)

module.exports = router