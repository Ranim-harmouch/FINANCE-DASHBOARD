const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/incomeController');

router.post('/incomes', incomeController.createIncome);

module.exports = router;
