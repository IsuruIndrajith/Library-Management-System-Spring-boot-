import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Alert, Space } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

function Register() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setMessage('');

    try {
      const response = await AuthService.register(
        values.username,
        values.email,
        values.password,
        'ADMIN' // Force ADMIN role for all registrations
      );
      
      if (response.data.code === '00') {
        setMessage('User registered successfully! Please login.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage(response.data.message || 'Registration failed');
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
            <Title level={4} style={{ color: '#666', fontWeight: 'normal' }}>Admin Registration</Title>
            <Alert
              message="This system is for administrators only"
              type="info"
              showIcon
              style={{ marginTop: 8 }}
            />
          </div>

          {message && (
            <Alert
              message={message}
              type={message.includes('successfully') ? 'success' : 'error'}
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          <Form
            name="register"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
                { min: 3, message: 'Username must be at least 3 characters!' }
              ]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Username" 
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input 
                prefix={<MailOutlined />} 
                placeholder="Email" 
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' }
              ]}
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
                Sign Up
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: 'center' }}>
            <span>Already have an account? </span>
            <Button type="link" onClick={() => navigate('/login')}>
              Login here
            </Button>
          </div>
        </Space>
      </Card>
    </div>
  );
}

export default Register;
