const db = require('../db/database.js');

class Expense {
    static async create(title, description, amount, currency, date, category_id, user_id, recurring, start_date, end_date) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO Expenses (title, description, amount, currency, date, category_id, user_id, recurring, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            db.run(sql, [title, description, amount, currency, date, category_id, user_id, recurring, start_date, end_date], function (err) {
                if (err) reject(err);
                else resolve({ expense_id: this.lastID, title, amount, currency, date });
            });
        });
    }
}

module.exports = Expense;
