const Category = require("../models/Category.js");
const categoryController = require("../controllers/categoryController");
// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, type, user_id } = req.body;
    const category = await Category.create(name, type, user_id);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
