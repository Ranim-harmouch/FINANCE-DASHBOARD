const Expense = require("../models/Expense.js");

// Get all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new expense
exports.createExpense = async (req, res) => {
  try {
    const {
      title,
      description,
      amount,
      currency,
      date,
      category_id,
      user_id,
      recurring,
      start_date,
      end_date,
    } = req.body;
    const expense = await Expense.create(
      title,
      description,
      amount,
      currency,
      date,
      category_id,
      user_id,
      recurring,
      start_date,
      end_date
    );
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
