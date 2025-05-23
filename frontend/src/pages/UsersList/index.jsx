import React, { useEffect, useState, useCallback } from "react";
import api from "@/services/api";
import { Breadcrumb, Input, Button, Table, Tag, message } from "antd";
import UserForm from "./components/UserForm";
import './index.less'

function UsersList() {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState("")

  // 使用 useCallback 确保 fetchUsers 函数的引用不会改变
  const fetchUsers = useCallback(async (search = '') => {
    try {
      const apiUrl = search ? `/users/${search}` : '/users';
      const res = await api.get(apiUrl);
      setUsers(res.data);
    } catch (error) {
      console.error(error, 'error==');
    }
  }, [])

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = useCallback(async () => {
    fetchUsers(searchName);
  }, [fetchUsers, searchName])

  const handleEdit = (val) => () => {
    setCurrentRow(val)
    setIsEditing(true);
    setIsModalOpen(true)
  }

  const handleDelete = (id) => async () => {
    try {
      await api.delete(`/users/${id}`);
      message.success('删除成功');
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  }


  const handleAddUser = () => {
    setIsEditing(false);
    setIsModalOpen(true);
  }

  const BreadcrumbItems = [
    {
      title: '用户列表',
    }
  ]

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        record.status === '1' ? <Tag color="#87d068">启用</Tag> : <Tag color="#f50">禁用</Tag>
      )
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (_, record) => (
        <span>{record.role === '0' ? '管理员' : '普通用户'}</span>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <div>
          <Button type="primary" onClick={handleEdit(record)}>编辑</Button>
          <Button danger onClick={handleDelete(record.id)} style={{ marginLeft: '10px' }}>删除</Button> 
        </div>
      )
    }
  ]

  return (
    <div className="users-list-wrap">
      <Breadcrumb items={BreadcrumbItems} />
      <p className="title">用户列表</p>
      <div className="user-list-header">
        <div className="search-wrap">
          <Input
            placeholder="请输入姓名"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Button type="primary" onClick={handleSearch} style={{ marginLeft: '10px' }}>搜索</Button>
        </div>
        <Button type="primary" style={{ textAlign: 'right' }} onClick={handleAddUser}>新增用户</Button>
      </div>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        style={{ marginTop: '20px' }}
      />
      {isModalOpen && (
        <UserForm 
          isEditing={isEditing}
          isModalOpen={isModalOpen} 
          setIsModalOpen={setIsModalOpen} 
          handleSearch={handleSearch} 
          currentRow={currentRow}
        />
      )}
    </div>
  )
}

export default UsersList;