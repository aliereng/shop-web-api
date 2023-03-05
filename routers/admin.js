const express = require("express");
const { getAccessToRoute, getAdminAccess } = require("../middlewares/authorization/auth");
const {getAllProducts} = require("../controllers/product")
const {register,
       login
    } = require("../controllers/admin");
const { getAllCustomers } = require("../controllers/customer");
const { getAllSuppliers } = require("../controllers/merchant");

const router = express.Router();
router.post("/login", login);
router.post("/register",[getAccessToRoute, getAdminAccess], register);
router.get("/products",[getAccessToRoute, getAdminAccess], getAllProducts);
router.get("/customers",[getAccessToRoute, getAdminAccess], getAllCustomers);
router.get("/suppliers",[getAccessToRoute, getAdminAccess], getAllSuppliers);
module.exports = router;