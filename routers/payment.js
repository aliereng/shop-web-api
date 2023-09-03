const express = require("express");
const {pay, pay3D, checkCreditCard, refund} = require("../controllers/payment")
const {createRequest} = require("../middlewares/payment/createRequest")

const router = express.Router();


router.post("/",createRequest , pay);
router.post("/threeD",createRequest , pay3D)
router.post("/refund", refund)
router.post("/checkCreditCard", checkCreditCard)

module.exports = router