const mysql = require('mysql2').createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '0402Jing?',
  database: 'admin_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: '+08:00', // 关键：设置连接时区为北京时间
}).promise();

module.exports = mysql;