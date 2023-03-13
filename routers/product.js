const express = require("express");
const {getAllProducts, addProduct, update, deleteAllProduct, deleteProductById, createStockAndAddProduct, getAllProductsBySupplier, getProductsByCategory} = require("../controllers/product");
const {getAccessToRoute, getSupplierAccess, getAdminAccess} = require("../middlewares/authorization/auth")
const {existStock} = require("../middlewares/product/product");
const imageUpload = require("../middlewares/library/uploadFile")
const router = express.Router();


router.get("/merchant",[getAccessToRoute, getSupplierAccess], getAllProductsBySupplier);
router.post("/add", [getAccessToRoute, getSupplierAccess, imageUpload.single("image")], addProduct)
router.post("/addstock", [getAccessToRoute, getSupplierAccess, existStock, imageUpload.single("image")], createStockAndAddProduct)
router.put("/:product_id/update", [getAccessToRoute, getSupplierAccess], update)
router.delete("/:product_id/delete",[getAccessToRoute, getSupplierAccess], deleteProductById)
router.delete("/deleteall", deleteAllProduct)
router.get("/:slug", getProductsByCategory)

module.exports = router;