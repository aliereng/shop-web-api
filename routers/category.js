const express = require("express");
const {getAllCategory,getCategoryById, add, update, remove, removeAll, addPropToThisCategory} = require("../controllers/category")
const router = express.Router();

router.get("/", getAllCategory)
router.get("/:id", getCategoryById)
router.post("/:categoryId/addfeatures", addPropToThisCategory)
router.get("/deleteAll", removeAll)
router.post("/add", add);
router.put("/:id/update", update);
router.delete("/:id/delete", remove)

module.exports = router;