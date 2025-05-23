admin-project/
├── backend/              # Node.js 后端服务
│   ├── server.js         # 入口文件
│   ├── routes/           # 路由模块
│   │   ├── auth.js       # 登录相关接口
│   │   └── users.js      # 用户管理接口
│   ├── controllers/      # 控制器逻辑
│   ├── models/           # 数据库模型
│   ├── config/db.js      # 数据库连接配置
│   └── utils/auth.js     # JWT 鉴权工具
│
├── frontend/             # React 前端项目
│   ├── public/
│   ├── src/
│   │   ├── components/   # 页面组件
│   │   ├── pages/        # 页面
│   │   ├── services/     # 请求封装
│   │   ├── App.js        # 路由配置
│   │   ├── auth.js       # 登录状态管理
│   │   └── index.js
│   └── package.json
│
└── README.md