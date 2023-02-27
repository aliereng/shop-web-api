const express = require("express");
const { register, login, deleteAllCustomer } = require("../controllers/auth/customer");

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.delete("/deleteall", deleteAllCustomer)
module.exports = router;