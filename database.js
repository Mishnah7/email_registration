const { Pool } = require('pg'); // Import the pg library
const path = require('path');

// Create a new PostgreSQL pool instance
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Use environment variable for connection string
});

// Create a users table
const createTable = async () => {
    const sql = `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`;

    try {
        await pool.query(sql);
        console.log('Users table created or already exists.');
    } catch (err) {
        console.error('Error creating table: ' + err.message);
    }
};

// Call the function to create the table
createTable()
    .then(() => pool.end()) // Close the pool after the operation
    .catch(err => {
        console.error('Error closing the pool: ' + err.message);
        pool.end();
    });
