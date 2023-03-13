const express = require("express");
const {getAllCategory,getCategoryById, add, update, remove, removeAll} = require("../controllers/category")
const router = express.Router();

router.get("/", getAllCategory)
router.post("/getcategorybyid", getCategoryById)
router.get("/deleteAll", removeAll)
router.post("/add", add);
router.put("/:id/update", update);
router.delete("/:id/delete", remove)

module.exports = router;