const express = require("express");
const { getAccessToRoute, getAdminAccess } = require("../middlewares/authorization/auth");
const {getAllProducts} = require("../controllers/product")
const {register, login, forgotPassword,resetPassword } = require("../controllers/auth");
const {deleteAllAdmins} = require("../controllers/admin");
const { getAllCustomers } = require("../controllers/customer");
const { getAllSuppliers } = require("../controllers/merchant");
const { customerQueryMiddleware } = require("../middlewares/query/customerQueryMiddleware");
const Customer = require("../models/Customer");
const { productQueryMiddleware } = require("../middlewares/query/productQueryMiddleware");
const Product = require("../models/Product");

const router = express.Router();
router.post("/login", login);
router.post("/register",register);
router.delete("/deleteall", deleteAllAdmins)
router.get("/products",[ productQueryMiddleware(Product, {
    population: [
        {path:"supplier", select:"name surname shopName email phone taxNumber"},
        {path:"stocks", select:"size color piece price type status"}
    ]
})], getAllProducts);
router.get("/customers",[getAccessToRoute, getAdminAccess, customerQueryMiddleware(Customer,{})], getAllCustomers);
router.get("/suppliers",[getAccessToRoute, getAdminAccess], getAllSuppliers);
module.exports = router;
