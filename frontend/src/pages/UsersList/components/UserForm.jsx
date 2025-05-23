import React, { useEffect } from "react";
import api from "@/services/api";
import { Modal, Form, Input, message, Switch, Select } from "antd"; 

function UserForm(props) {
  const { isModalOpen, setIsModalOpen, handleSearch, isEditing, currentRow } = props;
  
  const [form] = Form.useForm(); 

  useEffect(() => {
    if (isEditing && currentRow) {
      const { name, email, password, status, role }  = currentRow;
      form.setFieldsValue({
        name,
        email,
        password,
        status: status === '1', // 确保 status 是布尔值，'1' 表示启用，'0' 表示禁用 
        role,
      });
    } else {
      form.resetFields();
    }
  }, [isEditing, currentRow, form]);

  const handleSubmit = async (values) => {
    const userData = {...values, status: values.status ? '1' : '0'};
    try {
      // 使用表单提交的值而不是单独的 state
      if (isEditing && currentRow.id) {
        await api.put(`/users/${currentRow.id}`, userData);
        message.success('用户信息更新成功');
      } else {
        await api.post('/users', userData);
        message.success('用户创建成功');
      }
      setIsModalOpen(false); // 关闭模态框
      handleSearch();  // 刷新用户列表
    } catch (error) {
      console.error(error);
      message.error(isEditing ? '用户信息更新失败' : '用户创建失败');
    }
  };

  const roles = [
    { value: '0', label: '管理员' },
    { value: '1', label: '普通用户' }
  ];

  return (
    <Modal
      title={isEditing ? "编辑用户信息" : "添加新用户"}
      open={isModalOpen}
      onOk={() => form.submit()} // 触发表单提交
      onCancel={() => setIsModalOpen(false)}
      okText="确认"
      cancelText="取消"
      width={400}
    >
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        style={{ maxWidth: 400 }}
        initialValues={{ status: true }}
        onFinish={handleSubmit} // 将 handleSubmit 绑定到表单的 onFinish
        onFinishFailed={(errorInfo) => {
          console.log('Failed:', errorInfo);
        }}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="name"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[{ required: true, message: '请输入邮箱!' }, { type: 'email', message: '请输入有效的邮箱地址!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="状态"
          name="status"
          rules={[{ required: true, message: '请选择状态!' }]}
        >
          <Switch checkedChildren="启用" unCheckedChildren="禁用" />
        </Form.Item>
        <Form.Item
          label="角色"
          name="role"
          rules={[{ required: true, message: '请选择角色!' }]}
        >
          <Select options={roles} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UserForm;