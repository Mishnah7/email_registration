const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create a new database file
const dbPath = path.join(__dirname, 'users.db'); // This will create users.db in your project directory
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create a users table
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error('Error creating table ' + err.message);
        } else {
            console.log('Users table created or already exists.');
        }
    });
});

// Close the database connection
db.close();
