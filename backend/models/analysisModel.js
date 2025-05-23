const db = require('../config/db');

const getStat = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM statistics');
    return rows[0];
  } catch (error) {
    console.error('获取分析数据失败:', error);
    throw error;
  }
};

const getPageView = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM page_view');
    const [result] = await db.query('SELECT SUM(pv) FROM page_view')
    const count = result[0]['SUM(pv)']
    return { rows, count };
  } catch (error) {
    console.error('获取页面访问量失败:', error);
    throw error;
  }
}

const getKeywords = async(pageNum, pageSize) => {
  try {
    // 计算偏移量
    const offset = (pageNum - 1) * pageSize;
    // 查询当前页的数据
    const [rows] = await db.query('SELECT * FROM keywords LIMIT ? OFFSET ?', [pageSize, offset]);
    // 查询总记录数
    const [countResult] = await db.query('SELECT COUNT(*) AS total FROM keywords');
    const count = countResult[0].total;
    return { rows, count };
  } catch (error) {
    console.error('获取关键词失败:', error);
    throw error;
  }
}

const getCategory = async (channel) => {
  try {
    // 使用sql实现过滤
    // db.query(`SELECT * FROM category where  ? = 'all' OR channel = ?`, [channel, channel]);
    
    const sql = ` 
      SELECT category,
        SUM(CASE WHEN channel = 'online' THEN count ELSE 0 END) AS online_count,
        SUM(CASE WHEN channel = 'store' THEN count ELSE 0 END) AS store_count,
        SUM(COUNT) As total_count
      FROM category
      GROUP BY category;
    ` 
    const [rows] = await db.query(sql);
    let numericRows = rows.map(row => ({
      ...row,
      online_count: Number(row.online_count), // 字符串转数字
      store_count: Number(row.store_count),
      total_count: Number(row.total_count)
    }));
    return numericRows;
  } catch (error) {
    console.error('获取分类数据失败:', error);
    throw error;
  }
}

const getCvr = async () => {
  try {
    const [rows] = await db.query(`SELECT id, DATE_FORMAT(time, '%H:%i') AS time, type, value FROM cvr`);
    return rows;
  } catch (error) {
    console.error('获取cvr数据失败:', error);
    throw error;
  }
}

module.exports = {
  getStat,
  getPageView,
  getKeywords,
  getCategory,
  getCvr
};