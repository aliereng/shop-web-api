const express = require("express");
const product = require("./product")
const admin = require("./admin")
const category = require("./category")
const merchant = require("./merchant")
const customer = require("./customer")
const transaction = require("./transaction")
const shipper = require("./shipper")
const cart = require("./cart")

const router = express.Router();
router.use("/admin", admin)
router.use("/products", product);
router.use("/categories", category);
router.use("/customer", customer);
router.use("/merchant", merchant);
router.use("/cart", cart);
router.use("/transaction", transaction);
router.use("/shipper", shipper);
module.exports = router;