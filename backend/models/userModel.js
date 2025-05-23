const db = require('../config/db');

const getAllUsers = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  } catch (error) {
    console.error('获取用户列表失败:', error);
    throw error;
  }
};

const getUserByName = async (name) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE name = ?', [name]);
    return rows || [];
  } catch (error) {
    console.error('获取用户失败:', error);
    throw error;
  }
};

const createUser = async (name, email, password, status, role) => {
  try {
    const [result] = await db.query('INSERT INTO users (name, email, password, status, role) VALUES (?, ?, ?, ?, ?)', [name, email, password, status, role]);
    return result.insertId;
  } catch (error) {
    console.error('创建用户失败:', error);
    throw error;
  }
};

const updateUser = async (id, name, email, password, status, role) => {
  try {
    await db.query('UPDATE users SET name = ?, email = ?, password = ?, status = ?, role = ? WHERE id = ?', [name, email, password, status, role, id]);
  } catch (error) {
    console.error('更新用户失败:', error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    await db.query('DELETE FROM users WHERE id =?', [id]);
  } catch (error) {
    console.error('删除用户失败:', error);
    throw error;
  }
};  

module.exports = {
  getAllUsers,
  getUserByName,
  createUser,
  updateUser,
  deleteUser
};