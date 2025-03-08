const express = require("express");
const db = require("../db/database");
const {
  authenticateUser,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Fetch all users (Only accessible to super admin)
router.get(
  "/",
  authenticateUser,
  authorizeRoles(["super admin"]),
  (req, res) => {
    const sql = "SELECT * FROM Users";
    db.all(sql, [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  }
);

// Fetch user by ID (Super admin & admin can access)
router.get(
  "/:id",
  authenticateUser,
  authorizeRoles(["super admin", "admin"]),
  (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM Users WHERE user_id = ?";
    db.get(sql, [id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(row);
    });
  }
);

module.exports = router;
