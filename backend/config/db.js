const mysql = require('mysql2');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: './.env.development' });
} else if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: './.env.production' });
}

// 确保环境变量存在，避免 undefined
const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'admin_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: '+08:00',
};

const pool = mysql.createPool(dbConfig).promise();
module.exports = pool;