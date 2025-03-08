const Income = require('../models/Income.js');

// Get all incomes
exports.getAllIncomes = async (req, res) => {
  try {
    const incomes = await Income.findAll();
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new income
exports.createIncome = async (req, res) => {
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
    const income = await Income.create(
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
    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};