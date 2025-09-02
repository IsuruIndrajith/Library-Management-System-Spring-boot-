import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Alert, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

function Login() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setMessage('');

    try {
      const response = await AuthService.login(values.username, values.password);
      if (response.code === '00') {
        navigate('/dashboard');
      } else {
        setMessage(response.message || 'Login failed');
      }
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(resMessage);
    }

    setLoading(false);
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Card style={{ width: 400, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2} style={{ marginBottom: 0 }}>Library Management System</Title>
            <Title level={4} style={{ color: '#666', fontWeight: 'normal' }}>Admin Sign In</Title>
            <Alert
              message="Administrator access only"
              type="warning"
              showIcon
              style={{ marginTop: 8 }}
            />
          </div>

          {message && (
            <Alert
              message={message}
              type="error"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Username" 
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Password" 
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                style={{ width: '100%' }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: 'center' }}>
            <span>Don't have an account? </span>
            <Button type="link" onClick={() => navigate('/register')}>
              Register here
            </Button>
          </div>
        </Space>
      </Card>
    </div>
  );
}

export default Login;
