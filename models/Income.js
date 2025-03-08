
const db = require("../db/database.js");

class Income {
  // Find all incomes
  static async findAll() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM Incomes";
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Create a new income
  static async create(
    title,
    description,
    amount,
    currency,
    date,
    category_id,
    user_id,
    recurring,
    start_date,
    end_date
  ) {
    return new Promise((resolve, reject) => {
      const sql = `
                INSERT INTO Incomes (title, description, amount, currency, date, category_id, user_id, recurring, start_date, end_date)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
      db.run(
        sql,
        [
          title,
          description,
          amount,
          currency,
          date,
          category_id,
          user_id,
          recurring,
          start_date,
          end_date,
        ],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({
              income_id: this.lastID,
              title,
              description,
              amount,
              currency,
              date,
              category_id,
              user_id,
              recurring,
              start_date,
              end_date,
            });
          }
        }
      );
    });
  }
}

module.exports = Income;