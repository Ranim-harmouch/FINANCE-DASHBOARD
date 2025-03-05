const Category = require('../models/Category.js');

exports.createCategory = async (req, res) => {
    try {
        const { name, type, user_id } = req.body;
        const category = await Category.create(name, type, user_id);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
