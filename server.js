const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db/database.js'); 


const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const categoryRoutes = require('./routes/categoryRoutes.js');
const incomeRoutes = require('./routes/incomeRoutes.js');
const expenseRoutes = require('./routes/expenseRoutes.js');
const profitGoalRoutes = require('./routes/profitGoalRoutes.js');

dotenv.config();
const app = express();


// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/incomes', incomeRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/profitGoal', profitGoalRoutes);



// // Define the root route
// app.get('/', (req, res) => {
//     res.send('Welcome to the Finance Dashboard!');
// });



db.serialize(() => {
    db.get("SELECT name FROM sqlite_master WHERE type='table'", (err, row) => {
        if (err) {
            console.error("Database error:", err.message);
        } else {
            console.log("Database connected, sample table:", row);
        }
    });
});







// Fetch all users
app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM Users';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Fetch all categories
app.get('/api/categories', (req, res) => {
    const sql = 'SELECT * FROM Categories';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Fetch all incomes
app.get('/api/incomes', (req, res) => {
    const sql = 'SELECT * FROM Incomes';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Fetch all expenses
app.get('/api/expenses', (req, res) => {
    const sql = 'SELECT * FROM Expenses';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Fetch all profit goals
app.get('/api/profit_goals', (req, res) => {
    const sql = 'SELECT * FROM Profit_Goals';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Fetch user by ID
app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Users WHERE user_id = ?';
    db.get(sql, [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(row);
    });
});

// Fetch category by ID
app.get('/api/categories/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Categories WHERE category_id = ?';
    db.get(sql, [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(row);
    });
});



console.log("Starting server...");
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


