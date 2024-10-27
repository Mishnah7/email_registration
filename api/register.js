const { Pool } = require('pg');

// Create a new pool instance
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Use environment variable for connection string
});

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;

        try {
            const result = await pool.query(
                'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
                [name, email, password]
            );
            res.status(201).json({ message: 'User registered successfully', id: result.rows[0].id });
        } catch (err) {
            if (err.code === '23505') { // Unique violation
                return res.status(400).json({ message: 'User already exists' });
            }
            return res.status(500).json({ message: 'Error registering user' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
