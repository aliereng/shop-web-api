const express = require("express");
const {getStockFromProductByColor} = require("../controllers/stock");
const router = express.Router();
router.get("/:product_id", getStockFromProductByColor)
module.exports = router;