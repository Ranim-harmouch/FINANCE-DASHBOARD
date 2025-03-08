const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const { authenticateUser } = require("../middleware/authMiddleware");

// Routes
router.get("/", authenticateUser, expenseController.getAllExpenses);
router.post("/", authenticateUser, expenseController.createExpense);

// Export the router
module.exports = router;
