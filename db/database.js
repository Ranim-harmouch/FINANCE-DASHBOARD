// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');
// const fs = require('fs');

// // Path to the SQLite database file
// const dbPath = path.resolve(__dirname, 'database.sqlite');

// // Create a connection to the SQLite database
// const db = new sqlite3.Database(dbPath, (err) => {
//     if (err) {
//         console.error('Error opening the database:', err.message);
//     } else {
//         console.log('Connected to the SQLite database.');
//     }
// });

// // Initialize the database if it's empty (i.e., database.sqlite doesn't exist)
// if (!fs.existsSync(dbPath)) {
//     const sqlScript = fs.readFileSync(path.resolve(__dirname, 'database.sql'), 'utf8');
//     db.exec(sqlScript, (err) => {
//         if (err) {
//             console.error('Error executing SQL script:', err.message);
//         } else {
//             console.log('Database initialized with schema and data.');
//         }
//     });
// }

// module.exports = db;




const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Path to the SQLite database file
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Check if the database file exists, if not, initialize it with the database.sql script
if (!fs.existsSync(dbPath)) {
    console.log('Database file does not exist. Creating and initializing...');
    const sqlScript = fs.readFileSync(path.resolve(__dirname, 'database.sql'), 'utf8');
    
    db.exec(sqlScript, (err) => {
        if (err) {
            console.error('Error executing SQL script:', err.message);
        } else {
            console.log('Database initialized with schema and data.');
        }
    });
} else {
    console.log('Database file already exists. Skipping initialization...');
}

// Export the database connection
module.exports = db;
