const db = require('../db/database.js');

class ProfitGoal {
    static async create(target_amount, start_date, end_date, user_id) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO Profit_Goals (target_amount, start_date, end_date, user_id) VALUES (?, ?, ?, ?)';
            db.run(sql, [target_amount, start_date, end_date, user_id], function (err) {
                if (err) reject(err);
                else resolve({ goal_id: this.lastID, target_amount, start_date, end_date });
            });
        });
    }
}

module.exports = ProfitGoal;
