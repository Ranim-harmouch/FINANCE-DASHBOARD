const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const categoryController = require('../controllers/categoryController');

router.post('/users', userController.createUser);
router.get('/users/:username', userController.getUserByUsername);

router.post('/categories', categoryController.createCategory);

module.exports = router;
