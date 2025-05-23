const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

router.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE name = ?', [name]);
    const user = rows[0];
    if (!user || password !== user.password) {
      return res.status(401).json({ message: '用户名或密码错误' });
    }

    const token = jwt.sign({ userId: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
})

module.exports = router;

