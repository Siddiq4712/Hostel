// config/db.js
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectionLimit: 10
});

const db = pool.promise();

// test DB connection at startup
async function testConnection() {
    try {
        await db.query('SELECT 1');
        console.log('✅ Database connected successfully!');
    } catch (err) {
        console.error('❌ DB connection failed:', err.message);
        process.exit(1); // stop server if DB fails
    }
}

testConnection();

export default db;