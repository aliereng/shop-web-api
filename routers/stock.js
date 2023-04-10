const express = require("express");
const {getStockFromProductByColor} = require("../controllers/stock");
const {getAccessToRoute, getSupplierAccess} = require("../middlewares/authorization/auth");
const {addImagesThisStock, updateStock} = require("../controllers/stock")
const imageUpload = require("../middlewares/library/uploadFile");
const router = express.Router();
// router.get("/:product_id", getStockFromProductByColor)
router.put("/add", [getAccessToRoute, getSupplierAccess, imageUpload.array("images",10)], addImagesThisStock);
router.put("/update", [getAccessToRoute, getSupplierAccess], updateStock)

module.exports = router;