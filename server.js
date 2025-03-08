require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db/database.js");

// Import routes
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const incomeRoutes = require("./routes/incomeRoutes.js");
const expenseRoutes = require("./routes/expenseRoutes.js");
const profitGoalRoutes = require("./routes/profitGoalRoutes.js");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000; // Use PORT from environment variables or default to 5000

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/incomes", incomeRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/profit-goals", profitGoalRoutes);

// Database Connection Check
db.serialize(() => {
  db.get("SELECT name FROM sqlite_master WHERE type='table'", (err, row) => {
    if (err) {
      console.error("Database connection failed:", err.message);
    } else {
      console.log("Database connected. Sample table:", row);
    }
  });
});

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Finance Dashboard API!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
