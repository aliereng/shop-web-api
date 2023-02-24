const express = require("express");
const {getAllProducts, addProduct} = require("../controllers/product");
const {getAccessToRoute, getSupplierAccess} = require("../middlewares/authorization/auth")
const router = express.Router();

router.get("/", getAllProducts);
router.post("/add", [getAccessToRoute, getSupplierAccess], addProduct)

module.exports = router;