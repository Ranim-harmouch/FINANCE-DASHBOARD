const express = require('express');
const router = express.Router();

// Dummy route for authentication (Replace with actual logic)
router.get('/', (req, res) => {
    res.send('Auth route is working!');
});

module.exports = router;
