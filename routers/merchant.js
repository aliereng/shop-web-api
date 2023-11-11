const express = require("express");
const { getTransaction, updateTransaction, updateStock, deleteStock, deleteAllMerchant, sendRefundInfo, getShippersByMerchant , addShipper,removeShipper} = require("../controllers/merchant");
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
router.put("/transaction/send-refund-info", sendRefundInfo)
router.delete("/deletestock", deleteStock)
router.delete("/deleteall", deleteAllMerchant)
router.get("/transaction", [getAccessToRoute, getSupplierAccess, transactionQueryMiddleware(Transaction, options={
    population: [
        {
            path: "order",
            populate: [
                    {path:"customer", select:"ip"},
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
router.get("/get-shippers/:id", getShippersByMerchant)
router.post("/add-shippers", [getAccessToRoute, getSupplierAccess], addShipper)
router.get("/remove-shipper/:id", [getAccessToRoute, getSupplierAccess], removeShipper)
module.exports = router;