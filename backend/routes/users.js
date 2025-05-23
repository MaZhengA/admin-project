const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/auth');
const { getAllUsers, getUserByName, createUser, updateUser, deleteUser } = require('../models/userModel');

// server里定义了根路径，前端访问/users
router.get('/', authenticate, async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('获取用户列表失败:', error);
    res.status(500).json({ message: '获取用户列表失败' });
  }
});

router.get('/:name', authenticate, async (req, res) => {
  const user = await getUserByName(req.params.name);
  res.json(user);
});

router.post('/', authenticate, async (req, res) => {
  const { name, email, password, status, role } = req.body;
  const userId = await createUser(name, email, password, status, role);
  res.status(201).json({ id: userId });
});

router.put('/:id', authenticate, async (req, res) => {
  const { name, email, password, status, role } = req.body;
  await updateUser(req.params.id, name, email, password, status, role);
  res.json({ message: '用户信息更新成功' });
})

router.delete('/:id', authenticate, async (req, res) => {
  await deleteUser(req.params.id);
  res.json({ message: '用户删除成功' });
})

module.exports = router;