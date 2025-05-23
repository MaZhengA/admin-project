require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const analysisRouter = require('./routes/analysis');

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// 所有通过 authRouter 定义的路由，都会自动加上 /api/auth 的前缀。
// 模块化设计：将登录注册等认证相关接口集中管理
// 便于维护：后期扩展更容易定位逻辑归属
// 符合RESTful风格：auth表示认证资源，符合语义化设计
// 避免命名冲突
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/analysis', analysisRouter);

// 启动服务器
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://127.0.0.1:${PORT}`);
})