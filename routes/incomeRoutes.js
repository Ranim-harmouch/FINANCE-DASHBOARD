const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/incomeController");
const { authenticateUser } = require("../middleware/authMiddleware");

router.get("/", authenticateUser, incomeController.getAllIncomes);
router.post("/", authenticateUser, incomeController.createIncome);

module.exports = router;
