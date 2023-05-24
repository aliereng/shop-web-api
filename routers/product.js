const express = require("express");
const {getAllProducts, addProduct, update, deleteAllProduct, deleteProductById, getAllProductsBySupplier, getProductsByCategory,getProductById} = require("../controllers/product");
const {getAccessToRoute, getSupplierAccess, getAdminAccess, getCustomerAccess} = require("../middlewares/authorization/auth");
const { productQueryMiddleware } = require("../middlewares/query/productQueryMiddleware");
const { getCategoryIdBySlugName } = require("../middlewares/category/category");
const {existStock} = require("../middlewares/product/product");
const imageUpload = require("../middlewares/library/uploadFile");
const Product = require("../models/Product");

const router = express.Router();


router.get("",[productQueryMiddleware(Product, options={
    population: [
        {path:"stocks", select:"size color price base"}
    ]
})],getAllProducts)
router.get("/:slug/:id",getProductById)

router.get("/merchant",[getAccessToRoute, getSupplierAccess,productQueryMiddleware(Product, options={
    population:[
        {path:"stocks", select:"size color piece price image base images"},
        {path:"categories", select:"parent name children properties", populate:[
            {path:"children", select:"name children"},
            {path:"properties", select:"property results"}
        ]}
    ]
})], getAllProductsBySupplier);
router.post("/add", [getAccessToRoute, getSupplierAccess, imageUpload.single("image")], addProduct)
// router.post("/addimages", [getAccessToRoute, getSupplierAccess, existStock, imageUpload.array("images", 20)], addImagesThisStock)
router.put("/:product_id/update", [getAccessToRoute, getSupplierAccess], update)
router.delete("/:product_id/delete",[getAccessToRoute, getSupplierAccess], deleteProductById)
router.delete("/deleteall", deleteAllProduct)
router.get("/:slug", [getCategoryIdBySlugName,productQueryMiddleware(Product, {})],getProductsByCategory)

module.exports = router;