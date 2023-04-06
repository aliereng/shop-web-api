const express = require("express");
const product = require("./product")
const admin = require("./admin")
const category = require("./category")
const merchant = require("./merchant")
const customer = require("./customer")
const transaction = require("./transaction")
const shipper = require("./shipper")
const public = require("./public")
const cart = require("./cart")
const stock = require("./stock")
const auth = require("./auth")
const address = require("./address")
const order = require("./order")



const router = express.Router();
router.use("/auth", auth)
router.use("/admin", admin)
router.use("/products", product);
router.use("/categories", category);
router.use("/customer", customer);
router.use("/merchant", merchant);
router.use("/cart", cart);
router.use("/transaction", transaction);
router.use("/shipper", shipper);
router.use("/public", public)
router.use("/stocks", stock);
router.use("/address", address);
router.use("/orders", order);
module.exports = router;