const express = require("express");
const {addShipper} = require("../controllers/shipper")
const router = express.Router();
router.post("/", addShipper)
module.exports = router;