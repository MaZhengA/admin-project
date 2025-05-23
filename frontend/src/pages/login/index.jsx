import React, { useState } from "react";
import { Card, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import api from "@/services/api";
import auth from "@/utils/auth";
import user from "@/utils/user";
import { useNavigate } from "react-router-dom";
import "./index.less";

function Login() {
 const [name, setName] = useState("");
 const [password, setPassword] = useState("");
 const navigate = useNavigate();

 const handleLogin = async () => {
  try {
    const res = await api.post('/auth/login', { name, password });
    auth.setToken(res.data.token);
    user.setUserInfo(res.data.user);
    navigate('/');
  } catch (error) {
    console.error(error);
    alert('登录失败')
  }
 }

 return (
  <div className="login-wrap">
    <Card style={{ width: 300 }}>
      <h2>登录</h2>
      <Input placeholder="用户名" value={name} onChange={(e) => setName(e.target.value)} prefix={<UserOutlined />} />
      <Input.Password style={{ marginTop: 15, marginBottom: 15 }} placeholder="密码" 
        value={password} onChange={(e) => setPassword(e.target.value)} prefix={<LockOutlined />}  />
      <Button style={{ width: '100%' }} type="primary" onClick={handleLogin}>登录</Button>
    </Card>
  </div>
 )
}

export default Login;