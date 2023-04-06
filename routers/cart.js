const express = require("express");
const { addToCart, applyCart, getCart, updateCart} = require("../controllers/cart");
const {getAccessToRoute, getCustomerAccess} = require("../middlewares/authorization/auth")
const router = express.Router();

router.use([getAccessToRoute, getCustomerAccess])

router.post("/add",[getAccessToRoute, getCustomerAccess], addToCart);
router.post("/complete", applyCart)
router.get("/get", getCart)
router.put("/apply/:id", updateCart)

// router.get("/applycart" , applyCart)

module.exports = router