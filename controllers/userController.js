const User = require('../models/User.js');

exports.createUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        if (!['superadmin', 'admin'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role. Role must be either superadmin or admin.' });
        }
        const user = await User.create(username, password, role);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findByUsername(username);
        if (user) res.json(user);
        else res.status(404).json({ error: 'User not found' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
