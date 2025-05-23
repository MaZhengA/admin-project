import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 布局组件
import MainLayout from './Layouts/MainLayout';
import AuthLayout from './Layouts/AuthLayout';

// 页面组件
import Login from './pages/login/index';
import UsersList from './pages/UsersList/index';
import Analysis from './pages/Analysis/index';

// 权限控制
import ProtectedRoute from './components/ProtectedRoute';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router> 
        <Routes>
          {/* 公共路由 */}
          <Route 
            path='/login' 
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            } 
          />
          
          {/* 受保护的路由：需要登录访问 */}
          <Route path='/' 
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            } 
          >
            <Route index element={<Navigate to="/analysis" replace />} />
            <Route path='analysis' element={<Analysis />} />
            <Route path='users' element={<UsersList />} />
          </Route>

          <Route path='*' element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ConfigProvider>
  )
}

export default App
