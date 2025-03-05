const ProfitGoal = require('../models/ProfitGoal.js');

exports.createProfitGoal = async (req, res) => {
    try {
        const { target_amount, start_date, end_date, user_id } = req.body;
        const goal = await ProfitGoal.create(target_amount, start_date, end_date, user_id);
        res.status(201).json(goal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
