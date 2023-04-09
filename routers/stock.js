const express = require("express");
const {getStockFromProductByColor} = require("../controllers/stock");
const {getAccessToRoute, getSupplierAccess} = require("../middlewares/authorization/auth");
const {addImagesThisStock} = require("../controllers/stock")
const imageUpload = require("../middlewares/library/uploadFile");
const router = express.Router();
// router.get("/:product_id", getStockFromProductByColor)
router.put("/add", [getAccessToRoute, getSupplierAccess, imageUpload.single("image")], addImagesThisStock)
module.exports = router;