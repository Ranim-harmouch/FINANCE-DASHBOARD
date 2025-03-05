const db = require('../db/database.js');


class Category {
    static async create(name, type, user_id) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO Categories (name, type, user_id) VALUES (?, ?, ?)';
            db.run(sql, [name, type, user_id], function (err) {
                if (err) reject(err);
                else resolve({ category_id: this.lastID, name, type, user_id });
            });
        });
    }
}

module.exports = Category;

