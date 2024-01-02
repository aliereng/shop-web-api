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
const comment = require("./comment")
const question = require("./question")
const answer = require("./answer")
const payment = require("./payment")
const invoice = require("./invoice")

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
router.use("/comments", comment)
router.use("/question", question)
router.use("/answer", answer)
router.use("/payment", payment)
router.use("/invoice", invoice)

module.exports = router;