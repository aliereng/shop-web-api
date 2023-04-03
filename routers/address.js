const express = require("express");
const Address = require("../models/Address");
const {add, getByUserAddress,removeById, getById, updateById} = require("../controllers/address")
const { getAccessToRoute } = require("../middlewares/authorization/auth");

const router = express.Router();
router.get("/getaddress/:id", getAccessToRoute, getById)
router.put("/update/:id", getAccessToRoute, updateById)
router.get("/getuser", getAccessToRoute, getByUserAddress)
router.post("/add", getAccessToRoute, add);
router.delete("/remove/:id", getAccessToRoute, removeById)
module.exports = router