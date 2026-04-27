const { Pool } = require('pg');
require('dotenv').config();

// Pool = a connection to Postgres using creds from .env
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// This runs once when app starts - creates the table if it doesn't exist
const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log('Database ready');
};

module.exports = { pool, initDB };
