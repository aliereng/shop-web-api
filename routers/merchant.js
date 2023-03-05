const express = require("express");
const { register, login, getTransaction, updateTransaction,forgotPassword,resetPassword } = require("../controllers/auth/merchant");
const {getAccessToRoute, getSupplierAccess} = require("../middlewares/authorization/auth")
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/transaction", [getAccessToRoute, getSupplierAccess], getTransaction)
router.get("/transaction/update", [getAccessToRoute, getSupplierAccess], updateTransaction)
router.post("/forgotpassword", forgotPassword)
router.post("/resetpassword", resetPassword)

module.exports = router;