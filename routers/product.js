const express = require("express");
const {getAllProducts, addProduct, update, deleteAllProduct, deleteProductById, createStockAndAddProduct} = require("../controllers/product");
const {getAccessToRoute, getSupplierAccess} = require("../middlewares/authorization/auth")
const {existStock} = require("../middlewares/product/product")
const router = express.Router();

router.get("/", getAllProducts);
router.post("/add", [getAccessToRoute, getSupplierAccess], addProduct)
router.post("/addstock", [getAccessToRoute, getSupplierAccess, existStock], createStockAndAddProduct)
router.put("/:product_id/update", [getAccessToRoute, getSupplierAccess], update)
router.delete("/:product_id/delete",[getAccessToRoute, getSupplierAccess], deleteProductById)
router.delete("/deleteall", deleteAllProduct)

module.exports = router;