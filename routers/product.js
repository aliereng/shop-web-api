const express = require("express");
const {getAllProducts, addProduct, update, deleteAllProduct, deleteProductById, createStockAndAddProduct, getAllProductsBySupplier, getProductsByCategory,getProductById} = require("../controllers/product");
const {getAccessToRoute, getSupplierAccess, getAdminAccess, getCustomerAccess} = require("../middlewares/authorization/auth");
const {addImagesThisStock} = require("../controllers/stock")
const { productQueryMiddleware } = require("../middlewares/query/productQueryMiddleware");
const { getCategoryIdBySlugName } = require("../middlewares/category/category");
const {existStock} = require("../middlewares/product/product");
const imageUpload = require("../middlewares/library/uploadFile");
const Product = require("../models/Product");

const router = express.Router();


router.get("",[productQueryMiddleware(Product, options={
    population: [
        {path:"stocks", select:"size color price type"}
    ]
})],getAllProducts)
router.get("/:slug/:id", [productQueryMiddleware(Product, options={
    population: [
        {path:"categories", select:"name slug children", populate:{path:"children", select:"name slug"}},
        {path:"supplier", select:"shopName email phone"},
        {path:"stocks", select:"size color price type"}
]
})],getProductById)

router.get("/merchant",[getAccessToRoute, getSupplierAccess,productQueryMiddleware(Product, options={
    population:[
        {path:"stocks", select:"size color piece price image type images"}
    ]
})], getAllProductsBySupplier);
router.post("/add", [getAccessToRoute, getSupplierAccess, imageUpload.single("image")], addProduct)
router.post("/addstock", [getAccessToRoute, getSupplierAccess, existStock, imageUpload.single("image")], createStockAndAddProduct)
router.post("/addimages", [getAccessToRoute, getSupplierAccess, existStock, imageUpload.array("images", 20)], addImagesThisStock)
router.put("/:product_id/update", [getAccessToRoute, getSupplierAccess], update)
router.delete("/:product_id/delete",[getAccessToRoute, getSupplierAccess], deleteProductById)
router.delete("/deleteall", deleteAllProduct)
router.get("/:slug", [getCategoryIdBySlugName,productQueryMiddleware(Product, {})],getProductsByCategory)

module.exports = router;