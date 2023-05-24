const express = require("express");
const {addAnswer, updateAnswer} = require("../controllers/answer")
const router = express.Router();

router.post("/add", addAnswer),
// router.put("/update/:id", updateAnswer)

module.exports = router;
