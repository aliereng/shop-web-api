const express = require("express");
const {getAllCategory,getCategoryById, add, update, deleteCategoryById, deleteAllCategory, addPropToThisCategory} = require("../controllers/category");
const { getAccessToRoute, getAdminAccess } = require("../middlewares/authorization/auth");
const router = express.Router();

router.get("/", getAllCategory)
router.get("/:id", getCategoryById)
router.post("/:categoryId/addfeatures", addPropToThisCategory)
router.delete("/",[getAccessToRoute, getAdminAccess], deleteAllCategory)
router.post("/add", add);
router.put("/:id/update", update);
router.delete("/:categoryId/delete", deleteCategoryById)

module.exports = router;