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




const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const dbPath = path.resolve(__dirname, "database.sqlite");

// Check if the database file exists
const dbExists = fs.existsSync(dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening the database:", err.message);
    process.exit(1); // Exit if there's an error
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// If the database does not exist, initialize it
if (!dbExists) {
  console.log("Database file does not exist. Creating and initializing...");

  try {
    const sqlScriptPath = path.resolve(__dirname, "database.sql");
    if (!fs.existsSync(sqlScriptPath)) {
      console.error("Error: database.sql file is missing.");
      process.exit(1);
    }

    const sqlScript = fs.readFileSync(sqlScriptPath, "utf8");

    db.serialize(() => {
      db.exec(sqlScript, (err) => {
        if (err) {
          console.error("Error executing SQL script:", err.message);
          process.exit(1);
        } else {
          console.log("Database initialized successfully.");
        }
      });
    });
  } catch (error) {
    console.error(
      "Unexpected error while initializing the database:",
      error.message
    );
    process.exit(1);
  }
} else {
  console.log("Database file already exists. Skipping initialization...");
}

module.exports = db;
