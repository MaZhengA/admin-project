import React, { useState } from "react";
import { Layout, Menu, Popover, Avatar } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined
} from "@ant-design/icons";
import Logo from "@/assets/logo.svg"
import user from "../utils/user";
import avatar from "../assets/avatar.png";
import "./index.less";

const { Header, Content, Sider } = Layout;

function MainLayout() {
  const [current, setCurrent] = useState('1');

  const navigate = useNavigate();

  const userInfo = JSON.parse(user.getUserInfo());
  const username = userInfo.name;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const items = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: '分析页',
      route: 'analysis'
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: '用户管理',
      route: 'users'
    }
  ];

  const onClick = ({item, key}) => {
    setCurrent(key);
    navigate(`/${item.props.route}`);
  }

  const content = (
    <div style={{ cursor: 'pointer' }}>
      <LogoutOutlined 
        style={{ fontSize: '16px', marginRight: '10px' }}
        onClick={handleLogout}
      />
      <span>退出登录</span>
    </div>
  )

  return (
    <Layout style={{ height: '100%', overflow: 'hidden' }}>
      {/* 头部内容 */}
      <Header>
        <div className="system-wrap">
          <img src={Logo} alt="logo" />
          <span>后台管理系统</span>
        </div>
        <Popover className="logout" content={content} arrow={false} placement="bottom">
          <div>
            <Avatar src={<img src={avatar} alt="avatar" />} />
            <span className="username">{ username }</span>
          </div>
        </Popover>
      </Header>

      {/* 右侧内容 */}
      <Layout>
        {/* 左侧菜单 */}  
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[current]}
            items={items}
            onClick={onClick}
          />
        </Sider>
        {/* 内容区域 */}
        <Content style={{ padding: '20px', overflow: 'auto' }}>
          {/* 子路由将在这里渲染 */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout;