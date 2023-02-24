const express = require("express");
const products = require("./product")
const category = require("./category")
const router = express.Router();

router.use("/", products);
router.use("/categories", category)

module.exports = router;