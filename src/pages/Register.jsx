import { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    setError(null);
    try {
      const response = await axios.post('https://ecommerce-be-iota.vercel.app/api/register', {
        name: values.name,
        username: values.username,
        email: values.email,
        phone: values.phone,
        address: values.address,
        password: values.password,
      });
      localStorage.setItem('accessToken', response.data.token);
      navigate('/login'); // Redirect to the user details page after successful registration
    } catch (err) {
      setError('Registration Failed');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      style={{
        width: 400,
        margin: '100px auto',
        padding: 24,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: 8,
      }}
    >
      <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>
        Register
      </Title>
      <Form layout="vertical" onFinish={handleRegister}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input name="name" value={formData.name} onChange={handleChange} />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'The input is not valid E-mail!' },
          ]}
        >
          <Input name="email" value={formData.email} onChange={handleChange} />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: 'Please input your phone number!' },
            {
              pattern: /^\d{10}$/,
              message: 'Phone number must be 10 digits!',
            },
          ]}
        >
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Input
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Item>

        {error && <Alert message={error} type="error" showIcon />}

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
