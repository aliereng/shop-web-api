const express = require("express");
const {add,  getAll} = require("../controllers/shipper")
const router = express.Router();
router.post("/", add)
router.get("/", getAll)

module.exports = router;