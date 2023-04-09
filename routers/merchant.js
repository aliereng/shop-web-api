const express = require("express");
const { getTransaction, updateTransaction, updateStock, deleteStock, deleteAllMerchant } = require("../controllers/merchant");
const { register, login, forgotPassword, resetPassword } = require("../controllers/auth");
const { getAccessToRoute, getSupplierAccess } = require("../middlewares/authorization/auth")
const { transactionQueryMiddleware } = require("../middlewares/query/transactionQueryMiddleware");
const Transaction = require("../models/Transaction");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword)
router.post("/resetpassword", resetPassword)
router.put("/updatestock", updateStock)
router.delete("/deletestock", deleteStock)
router.delete("/deleteall", deleteAllMerchant)
router.get("/transaction", [getAccessToRoute, getSupplierAccess, transactionQueryMiddleware(Transaction, options={
    population: [
        {
            path: "order",
           populate: [
                { path: "product", select: "name slug" },
                { path: "stock", select: "size color price image" },
                { path: "shipper", select: "name" },
                { path: "deliveredAddress", select: "title info" },
                { path: "invoiceAddress", select: "title info" }
            ]
        }
    ]
})], getTransaction)
router.put("/transaction/update", [getAccessToRoute, getSupplierAccess], updateTransaction)


module.exports = router;