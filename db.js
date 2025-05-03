const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'school_lunch_ordering',
  waitForConnections: true,
  connectionLimit: 10
});

async function initialize() {
  const conn = await pool.getConnection();
  try {
    // Create tables if they don't exist
    await conn.query(`
      CREATE TABLE IF NOT EXISTS Users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL
      )
    `);
    
    await conn.query(`
      CREATE TABLE IF NOT EXISTS MenuItems (
        item_id INT AUTO_INCREMENT PRIMARY KEY,
        item_name VARCHAR(100) NOT NULL UNIQUE,
        price DECIMAL(10,2) NOT NULL,
        category VARCHAR(50) NOT NULL,
        image_url VARCHAR(255)
      )
    `);
    
    await conn.query(`
      CREATE TABLE IF NOT EXISTS Orders (
        order_id INT AUTO_INCREMENT PRIMARY KEY,
        order_number VARCHAR(20) NOT NULL,
        student_name VARCHAR(100) NOT NULL,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        total DECIMAL(10,2) NOT NULL,
        payment DECIMAL(10,2) NOT NULL,
        change_amount DECIMAL(10,2) NOT NULL,
        items JSON NOT NULL
      )
    `);

    // Create default admin
    const [users] = await conn.query('SELECT * FROM Users WHERE username = "admin"');
    if (users.length === 0) {
      const hash = await bcrypt.hash('password123', 10);
      await conn.query('INSERT INTO Users (username, password_hash) VALUES (?, ?)', ['admin', hash]);
    }
  } finally {
    conn.release();
  }
}

module.exports = { pool, initialize };