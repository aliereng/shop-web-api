const express = require("express");
const {getAllProducts, addProduct} = require("../controllers/product")
const router = express.Router();

router.get("/", getAllProducts);
router.post("/:supplier_id/add_product", addProduct)

module.exports = router;