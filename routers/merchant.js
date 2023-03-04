const express = require("express");
const { register, login, getTransaction } = require("../controllers/auth/merchant");
const {getAccessToRoute, getSupplierAccess} = require("../middlewares/authorization/auth")
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/transaction", [getAccessToRoute, getSupplierAccess], getTransaction)


module.exports = router;