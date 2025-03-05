const db = require('../db/database.js');

class Income {
    static async create(title, description, amount, currency, date, category_id, user_id, recurring, start_date, end_date) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO Incomes (title, description, amount, currency, date, category_id, user_id, recurring, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            db.run(sql, [title, description, amount, currency, date, category_id, user_id, recurring, start_date, end_date], function (err) {
                if (err) reject(err);
                else resolve({ income_id: this.lastID, title, amount, currency, date });
            });
        });
    }
}

module.exports = Income;
