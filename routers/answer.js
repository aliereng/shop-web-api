const express = require("express");
const {addAnswer, updateAnswer, deleteAnswer} = require("../controllers/answer")
const router = express.Router();

router.post("/add", addAnswer),
router.put("/update/:id", updateAnswer)
router.delete("/delete/:id", deleteAnswer)

module.exports = router;
