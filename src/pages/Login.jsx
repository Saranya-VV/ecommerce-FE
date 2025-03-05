import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Alert } from 'antd';

const { Title } = Typography;

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setError(null);
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        username: values.username,
        password: values.password,
      });
      localStorage.setItem('accessToken', response.data.token);
      navigate('/');
    } catch (err) {
      setError('Invalid Login');
    }
  };

  return (
    <div 
      style={{
        width: '400px',
        margin: '100px auto',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        backgroundColor: '#fff', // Set background to white for clarity
      }}
    >
      <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
        Login
      </Title>

      <Form
        layout="vertical"
        onFinish={handleLogin}
        initialValues={{ username, password }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username" 
            style={{ padding: '10px', fontSize: '14px' }} // Custom styles for Input
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={{ padding: '10px', fontSize: '14px' }} // Custom styles for Input.Password
          />
        </Form.Item>

        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '16px' }} />}

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            block
            style={{ 
              height: '40px', 
              fontSize: '16px', 
              backgroundColor: '#1890ff',
              borderColor: '#1890ff',
              padding: '0 16px'
            }} // Custom styles for Button
          >
            Login
          </Button>
        </Form.Item>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Link to="/register" style={{ fontSize: '14px' }}>New User? Register here</Link>
        </div>
      </Form>
    </div>
  );
}

export default Login;
