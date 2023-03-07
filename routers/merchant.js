const express = require("express");
const { getTransaction, updateTransaction} = require("../controllers/merchant");
const {register, login, forgotPassword,resetPassword } = require("../controllers/auth");
const {getAccessToRoute, getSupplierAccess} = require("../middlewares/authorization/auth")
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/transaction", [getAccessToRoute, getSupplierAccess], getTransaction)
router.get("/transaction/update", [getAccessToRoute, getSupplierAccess], updateTransaction)
router.post("/forgotpassword", forgotPassword)
router.post("/resetpassword", resetPassword)

module.exports = router;