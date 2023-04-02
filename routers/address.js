const express = require("express");
const Address = require("../models/Address");
const {add, getById} = require("../controllers/address")
const { getAccessToRoute } = require("../middlewares/authorization/auth");

const router = express.Router();

router.get("/getuser", getAccessToRoute, getById)
router.post("/add", getAccessToRoute, add);

module.exports = router