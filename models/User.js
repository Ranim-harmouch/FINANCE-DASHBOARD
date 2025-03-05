const db = require('../db/database.js');

class User {
    static async create(username, password, role) {
        return new Promise((resolve, reject) => {
            if (!['superadmin', 'admin'].includes(role)) {
                return reject(new Error('Invalid role. Role must be either superadmin or admin.'));
            }
            const sql = 'INSERT INTO Users (username, password, role) VALUES (?, ?, ?)';
            db.run(sql, [username, password, role], function (err) {
                if (err) reject(err);
                else resolve({ user_id: this.lastID, username, role });
            });
        });
    }

    static async findByUsername(username) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM Users WHERE username = ?', [username], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }
}

module.exports = User;
