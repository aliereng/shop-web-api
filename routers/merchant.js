const express = require("express");
const { getTransaction, updateTransaction, updateStock, deleteStock, deleteAllMerchant} = require("../controllers/merchant");
const {register, login, forgotPassword,resetPassword } = require("../controllers/auth");
const {getAccessToRoute, getSupplierAccess} = require("../middlewares/authorization/auth")
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword)
router.post("/resetpassword", resetPassword)
router.put("/updatestock", updateStock)
router.delete("/deletestock", deleteStock)
router.delete("/deleteall", deleteAllMerchant)
router.get("/transaction", [getAccessToRoute, getSupplierAccess], getTransaction)
router.get("/transaction/update", [getAccessToRoute, getSupplierAccess], updateTransaction)


module.exports = router;