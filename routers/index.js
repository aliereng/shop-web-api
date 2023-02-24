const express = require("express");
const product = require("./product")
const category = require("./category")
const merchant = require("./merchant")
const customer = require("./customer")
const router = express.Router();

router.use("/", product);
router.use("/products", product)
router.use("/categories", category)

router.use("/customer", customer)
router.use("/merchant", merchant)

module.exports = router;