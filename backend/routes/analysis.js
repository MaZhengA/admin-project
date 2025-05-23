const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/auth');
const { getStat, getPageView, getKeywords, getCategory, getCvr } = require('../models/analysisModel');

router.get('/statistics', authenticate, async (req, res) => {
  try {
    const stat = await getStat();
    res.json({data: stat, code: 200, message: 'ok'});
  } catch (error) {
    console.error('获取统计数据失败:', error);
    res.status(500).json({ message: '获取统计数据失败' });
  }
});


router.get('/pageView', authenticate, async (req, res) => {
  try {
    const { rows, count } = await getPageView();
    res.json({data: rows, count, code: 200, message: 'ok'});
  } catch (error) {
    console.error('获取页面访问量失败:', error);
    res.status(500).json({ message: '获取页面访问量失败' });
  }
});

router.get('/keywords', authenticate, async (req, res) => {
  const pageNum = parseInt(req.query.pageNum) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  try {
    const { rows, count } = await getKeywords(pageNum, pageSize);
    res.json({data: rows, total: count, code: 200, message: 'ok'});
  } catch (error) {
    console.error('获取关键词失败:', error);
    res.status(500).json({ message: '获取关键词失败' });
  }
});

router.get('/category', authenticate, async (req, res) => {
  try {
    const channel = req.query.channel;
    const rows = await getCategory(channel);
    res.json({data: rows, code: 200, message: 'ok'});
  } catch (error) {
    console.error('获取分类数据失败:', error);
    res.status(500).json({ message: '获取分类数据失败' });
  } 
});

router.get('/cvr', authenticate, async (req, res) => {
  try {
    const rows = await getCvr();
    res.json({data: rows, code: 200, message: 'ok'});
  } catch (error) {
    console.error('获取cvr数据失败:', error);
    res.status(500).json({ message: '获取cvr数据失败' });
  }
});

module.exports = router;