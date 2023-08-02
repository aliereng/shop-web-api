const express = require("express");
const {pay} = require("../controllers/payment")

const router = express.Router();


router.get("/",pay)


module.exports = router