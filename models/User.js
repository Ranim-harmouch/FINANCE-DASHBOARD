
const db = require("../db/database.js");
const bcrypt = require("bcrypt");

class User {
  // Create a new user
  static async create(username, email, password, role) {
    return new Promise(async (resolve, reject) => {
      if (!["superadmin", "admin", "user"].includes(role)) {
        return reject(
          new Error(
            "Invalid role. Role must be either superadmin, admin, or user."
          )
        );
      }

      try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database
        const sql =
          "INSERT INTO Users (username, email, password, role) VALUES (?, ?, ?, ?)";
        db.run(sql, [username, email, hashedPassword, role], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ user_id: this.lastID, username, email, role });
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  // Find a user by username
  static async findByUsername(username) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM Users WHERE username = ?";
      db.get(sql, [username], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  // Find a user by email
  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM Users WHERE email = ?";
      db.get(sql, [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
}

module.exports = User;
