const db = require("../db/database.js");

class ProfitGoal {
  // Create a new profit goal
  static async create(target_amount, start_date, end_date, user_id) {
    return new Promise((resolve, reject) => {
      const sql = `
                INSERT INTO Profit_Goals (target_amount, start_date, end_date, user_id)
                VALUES (?, ?, ?, ?)
            `;
      db.run(
        sql,
        [target_amount, start_date, end_date, user_id],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({
              goal_id: this.lastID,
              target_amount,
              start_date,
              end_date,
              user_id,
            });
          }
        }
      );
    });
  }

  // Find all profit goals
  static async findAll() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM Profit_Goals";
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Find profit goals by user ID
  static async findByUserId(user_id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM Profit_Goals WHERE user_id = ?";
      db.all(sql, [user_id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = ProfitGoal;
