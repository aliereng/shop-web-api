const express = require("express");
const { login, register, forgotPassword, resetPassword} = require("../controllers/auth");
// const {getAccessToRoute, getCustomerAccess} = require("../middlewares/authorization/auth")
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword", resetPassword);





module.exports = router