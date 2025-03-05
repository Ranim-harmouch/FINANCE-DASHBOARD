const express = require('express');
const router = express.Router();
const profitGoalController = require('../controllers/profitGoalController');

router.post('/profit-goals', profitGoalController.createProfitGoal);

module.exports = router;
