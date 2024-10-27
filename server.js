const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // Import the pg library
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Create a new PostgreSQL pool instance
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Use environment variable for connection string
});

// Route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html')); // Serve your HTML file
});

// API endpoint to register a user
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Insert user into the database
    const sql = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id`;
    try {
        const result = await pool.query(sql, [name, email, password]);
        res.status(201).json({ message: 'User registered successfully', id: result.rows[0].id });
    } catch (err) {
        if (err.code === '23505') { // Unique violation
            return res.status(400).json({ message: 'User already exists' });
        }
        return res.status(500).json({ message: 'Error registering user' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
