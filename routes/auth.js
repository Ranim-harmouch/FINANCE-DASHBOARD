const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const categoryController = require("../controllers/categoryController");
const incomeController = require("../controllers/incomeController");
const expenseController = require("../controllers/expenseController");
const profitGoalController = require("../controllers/profitGoalController");
const {
  authenticateUser,
  authorizeRoles,
} = require("../middleware/authMiddleware");


// User Routes
router.post(
  "/users",
  authenticateUser,
  authorizeRoles(["super admin"]),
  userController.createUser
);
router.get(
  "/users",
  authenticateUser,
  authorizeRoles(["super admin"]),
  userController.getAllUsers
);
router.get("/users/:id", authenticateUser, userController.getUserById);

// Category Routes
router.post("/categories", authenticateUser, categoryController.createCategory);
router.get(
  "/categories",
  authenticateUser,
  categoryController.getAllCategories
);
router.get(
  "/categories/:id",
  authenticateUser,
  categoryController.getCategoryById
);

// Income Routes
router.post("/incomes", authenticateUser, incomeController.createIncome);
router.get("/incomes", authenticateUser, incomeController.getAllIncomes);
router.get("/incomes/:id", authenticateUser, incomeController.getIncomeById);

// Expense Routes
router.post("/expenses", authenticateUser, expenseController.createExpense);
router.get("/expenses", authenticateUser, expenseController.getAllExpenses);
router.get("/expenses/:id", authenticateUser, expenseController.getExpenseById);

// Profit Goal Routes
router.post(
  "/profit-goals",
  authenticateUser,
  profitGoalController.createProfitGoal
);
router.get(
  "/profit-goals",
  authenticateUser,
  profitGoalController.getAllProfitGoals
);
router.get(
  "/profit-goals/:id",
  authenticateUser,
  profitGoalController.getProfitGoalById
);

module.exports = router;
