const express = require("express");
const {getAllProducts, addProduct, update, deleteAllProduct, deleteProductById, createStockAndAddProduct, getAllProductsBySupplier, getProductsByCategory,getProductById} = require("../controllers/product");
const {getAccessToRoute, getSupplierAccess, getAdminAccess} = require("../middlewares/authorization/auth");
const { productQueryMiddleware } = require("../middlewares/query/productQueryMiddleware");
const { getCategoryIdBySlugName } = require("../middlewares/category/category");
const {existStock} = require("../middlewares/product/product");
const imageUpload = require("../middlewares/library/uploadFile");
const Product = require("../models/Product");

const router = express.Router();


router.get("/",[productQueryMiddleware(Product, {})], getAllProducts)
router.get("/:id", getProductById)
router.get("/merchant",[getAccessToRoute, getSupplierAccess], getAllProductsBySupplier);
router.post("/add", [getAccessToRoute, getSupplierAccess, imageUpload.single("image")], addProduct)
router.post("/addstock", [getAccessToRoute, getSupplierAccess, existStock, imageUpload.single("image")], createStockAndAddProduct)
router.put("/:product_id/update", [getAccessToRoute, getSupplierAccess], update)
router.delete("/:product_id/delete",[getAccessToRoute, getSupplierAccess], deleteProductById)
router.delete("/deleteall", deleteAllProduct)
router.get("/:slug", [getCategoryIdBySlugName,productQueryMiddleware(Product, {})],getProductsByCategory)

module.exports = router;