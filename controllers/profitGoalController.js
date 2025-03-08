const ProfitGoal = require("../models/ProfitGoal.js");

// Get all profit goals
exports.getAllProfitGoals = async (req, res) => {
  try {
    const profitGoals = await ProfitGoal.findAll();
    res.status(200).json(profitGoals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new profit goal
exports.createProfitGoal = async (req, res) => {
  try {
    const { target_amount, start_date, end_date, user_id } = req.body;
    const profitGoal = await ProfitGoal.create(
      target_amount,
      start_date,
      end_date,
      user_id
    );
    res.status(201).json(profitGoal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
