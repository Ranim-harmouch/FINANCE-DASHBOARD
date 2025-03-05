const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController.js');

// router.get('/categories', categoryController.getAllCategories);
// router.get('/', getCategories);


exports.getCategories = (req, res) => {
    res.json({ message: "Categories fetched successfully!" });
};


module.exports = router;
