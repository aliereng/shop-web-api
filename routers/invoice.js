const express = require("express");
const {getInvoice} = require("../controllers/invoice");
const { createInvoice } = require("../middlewares/invoice/createInvoice");
const router = express.Router();

router.get("/:id", getInvoice)

module.exports = router