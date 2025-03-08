
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { authenticateUser } = require("../middleware/authMiddleware");

router.get("/", authenticateUser, categoryController.getAllCategories);
router.post("/", authenticateUser, categoryController.createCategory);
console.log(categoryController.getAllCategories); // Should log a function
console.log(categoryController.createCategory); // Should log a function
module.exports = router;
