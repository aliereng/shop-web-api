const express = require("express");
const {getAll, add, update, remove, removeAll} = require("../controllers/category")
const router = express.Router();

router.get("/", getAll);
router.get("/deleteAll", removeAll)
router.post("/", add);
router.put("/:id/update", update);
router.delete("/:id/delete", remove)

module.exports = router;